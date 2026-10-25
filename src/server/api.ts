import { z } from 'zod';
import type { Bootstrap,CartLine,User } from '../shared';
import { auth } from './auth';
import { StoreError,filterProducts,mergeCart,canTransition } from './core';
import { products,config,currentUser,orderModel,cleanup as cleanupDatabase,digest,type OrderRow } from './repository';
import { quoteSchema,checkoutSchema,stateSchema,profileSchema,productSchema,promoSchema,configSchema } from './validation';
import { quote,createOrder,authorizedOrder,payOrder,cancelOrder } from './orders';
export const cleanup=cleanupDatabase;
const json=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function body(request:Request):Promise<unknown>{
 const reader=request.body?.getReader();if(!reader)throw new StoreError('Не переданы данные');
 const chunks:Uint8Array[]=[];let length=0;
 while(true){const chunk=await reader.read();if(chunk.done)break;length+=chunk.value.length;if(length>131072){await reader.cancel();throw new StoreError('Слишком большой запрос',413)}chunks.push(chunk.value)}
 const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
 try{return JSON.parse(new TextDecoder().decode(bytes)) as unknown}catch{throw new StoreError('Некорректный JSON')}
}
async function rateLimit(request:Request,env:Env,path:string){
 const window=path.startsWith('/api/auth')?15*60*1000:path==='/api/orders'?60*60*1000:60*1000;
 const limit=path.startsWith('/api/auth')?30:path==='/api/orders'?20:100;
 const now=Date.now(),bucket=Math.floor(now/window),ip=request.headers.get('CF-Connecting-IP')??'local';
 const key=await digest(ip+':'+path.split('/').slice(0,3).join('/')+':'+bucket);
 const result=await env.DB.prepare('INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,(bucket+1)*window).first<{count:number}>();
 if(result&&result.count>limit)throw new StoreError('Слишком много запросов. Попробуйте позже.',429);
}
async function requireUser(request:Request,env:Env){const user=await currentUser(request,env);if(!user)throw new StoreError('Войдите в аккаунт',401);return user}
async function state(env:Env,user:User){const row=await env.DB.prepare('SELECT cart,favorites FROM user_state WHERE user_id=?').bind(user.id).first<{cart:string;favorites:string}>();return row?{cart:JSON.parse(row.cart) as CartLine[],favorites:JSON.parse(row.favorites) as string[]}:{cart:[],favorites:[]}}
async function saveState(env:Env,user:User,value:{cart:CartLine[];favorites:string[]}){await env.DB.prepare('INSERT INTO user_state(user_id,cart,favorites) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET cart=excluded.cart,favorites=excluded.favorites').bind(user.id,JSON.stringify(value.cart),JSON.stringify(value.favorites)).run();return value}
export async function loadBootstrap(request:Request,env:Env):Promise<Bootstrap>{
 const [catalog,settings,user]=await Promise.all([products(env),config(env),currentUser(request,env)]);return {products:catalog,config:settings,user};
}
export async function handleApi(request:Request,env:Env):Promise<Response|null>{
 const url=new URL(request.url),path=url.pathname,method=request.method;
 if(!path.startsWith('/api/'))return null;
 try{
  if(!['GET','HEAD','POST','PUT'].includes(method))return json({error:'Метод не поддерживается'},405);
  if(method!=='GET'&&method!=='HEAD'){
   const origin=request.headers.get('Origin');
   if(origin!==new URL(env.BASE_URL).origin)throw new StoreError('Запрос с другого сайта запрещён',403);
   if(!request.headers.get('Content-Type')?.includes('application/json'))throw new StoreError('Ожидается JSON',415);
   await rateLimit(request,env,path);
  }
  if(path.startsWith('/api/auth/')){
   if(path==='/api/auth/request-password-reset'&&(!env.RESEND_API_KEY||!env.MAIL_FROM))throw new StoreError('Восстановление по почте пока не подключено. Владелец должен настроить почтовый сервис.',503);
   if(method==='POST'){const payload=await body(request);const authRequest=new Request(request.url,{method,headers:request.headers,body:JSON.stringify(payload)});return await auth(env).handler(authRequest)}
   return await auth(env).handler(request);
  }
  if(path==='/api/config'&&method==='GET')return json(await config(env));
  if(path==='/api/me'&&method==='GET')return json({user:await currentUser(request,env)});
  if(path==='/api/products'&&method==='GET')return json(filterProducts(await products(env),url.searchParams));
  if(path.startsWith('/api/products/')&&method==='GET'){const product=(await products(env)).find(p=>p.slug===decodeURIComponent(path.slice(14)));if(!product)throw new StoreError('Товар не найден',404);return json({product})}
  if(path==='/api/quote'&&method==='POST'){await cleanupDatabase(env);return json(await quote(env,quoteSchema.parse(await body(request))))}
  if(path==='/api/orders'&&method==='POST'){await cleanupDatabase(env);return json(await createOrder(env,checkoutSchema.parse(await body(request)),await currentUser(request,env)),201)}
  if(path==='/api/orders'&&method==='GET'){const user=await requireUser(request,env);await cleanupDatabase(env);const rows=await env.DB.prepare('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 100').bind(user.id).all<OrderRow>();return json({orders:await Promise.all(rows.results.map(r=>orderModel(r,env)))})}
  const orderMatch=path.match(/^\/api\/orders\/([a-zA-Z0-9-]+)(?:\/(pay|cancel))?$/);
  if(orderMatch){await cleanupDatabase(env);const row=await authorizedOrder(request,env,orderMatch[1],await currentUser(request,env));
   if(!orderMatch[2]&&method==='GET')return json({order:await orderModel(row,env)});
   if(orderMatch[2]==='pay'&&method==='POST'){const {scenario}=z.object({scenario:z.enum(['success','declined','cancelled'])}).parse(await body(request));return json(await payOrder(env,row,scenario))}
   if(orderMatch[2]==='cancel'&&method==='POST')return json(await cancelOrder(env,row));
  }
  if(path==='/api/state'||path==='/api/state/merge'){
   const user=await requireUser(request,env);
   if(method==='GET'&&path==='/api/state')return json(await state(env,user));
   if(method==='PUT'||method==='POST'){const input=stateSchema.parse(await body(request)),catalog=await products(env),previous=path.endsWith('/merge')?await state(env,user):{cart:[],favorites:[]};return json(await saveState(env,user,{cart:mergeCart(previous.cart,input.cart,catalog),favorites:Array.from(new Set([...previous.favorites,...input.favorites])).slice(0,200)}))}
  }
  if(path==='/api/profile'){
   const user=await requireUser(request,env);
   if(method==='GET'){const addresses=await env.DB.prepare('SELECT id,name,city,address,postal_code AS postalCode,phone FROM addresses WHERE user_id=?').bind(user.id).all();return json({name:user.name,addresses:addresses.results})}
   if(method==='PUT'){const input=profileSchema.parse(await body(request));const statements=[env.DB.prepare('UPDATE user SET name=?,updatedAt=? WHERE id=?').bind(input.name,Date.now(),user.id),env.DB.prepare('DELETE FROM addresses WHERE user_id=?').bind(user.id),...input.addresses.map(a=>env.DB.prepare('INSERT INTO addresses(id,user_id,name,city,address,postal_code,phone) VALUES(?,?,?,?,?,?,?)').bind(user.id+'_'+a.id.replace(user.id+'_',''),user.id,a.name,a.city,a.address,a.postalCode,a.phone))];await env.DB.batch(statements);return json(input)}
  }
  if(path.startsWith('/api/admin')){
   const user=await requireUser(request,env);if(user.role!=='admin')throw new StoreError('Доступ разрешён только владельцу магазина',403);
   if(path==='/api/admin'&&method==='GET'){await cleanupDatabase(env);const [catalog,settings,rows,promos]=await Promise.all([products(env,true),config(env),env.DB.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 200').all<OrderRow>(),env.DB.prepare('SELECT code,percent,active,expires_at AS expiresAt,min_subtotal AS minSubtotal,max_uses AS maxUses,uses FROM promos').all()]);return json({products:catalog,config:settings,orders:await Promise.all(rows.results.map(r=>orderModel(r,env,true))),promos:promos.results.map(p=>({...p,active:!!p.active}))})}
   if((path==='/api/admin/products'&&method==='POST')||(path.startsWith('/api/admin/products/')&&method==='PUT')){
    const {product}=z.object({product:productSchema}).parse(await body(request));
    if(method==='PUT'&&path.split('/').pop()!==product.id)throw new StoreError('Идентификаторы не совпадают');
    const existing=await env.DB.prepare('SELECT id FROM products WHERE id=?').bind(product.id).first();
    if(method==='POST'&&existing)throw new StoreError('Товар уже существует',409);
    if(method==='PUT'&&!existing)throw new StoreError('Товар не найден',404);
    const statements=[env.DB.prepare('INSERT INTO products(id,slug,sku,name,category,subcategory,collection,description,composition,care,fit,price,old_price,images,is_new,rank,status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug,sku=excluded.sku,name=excluded.name,category=excluded.category,subcategory=excluded.subcategory,collection=excluded.collection,description=excluded.description,composition=excluded.composition,care=excluded.care,fit=excluded.fit,price=excluded.price,old_price=excluded.old_price,images=excluded.images,is_new=excluded.is_new,rank=excluded.rank,status=excluded.status').bind(product.id,product.slug,product.sku,product.name,product.category,product.subcategory,product.collection,product.description,product.composition,product.care,product.fit,product.price,product.oldPrice,JSON.stringify(product.images),Number(product.isNew),product.rank,product.status)];
    const ids=product.variants.map(v=>v.id);
    statements.push(env.DB.prepare('UPDATE variants SET stock=0 WHERE product_id=? AND id NOT IN('+ids.map(()=>'?').join(',')+')').bind(product.id,...ids));
    for(const v of product.variants){
     const original=await env.DB.prepare('SELECT product_id FROM variants WHERE id=?').bind(v.id).first<{product_id:string}>();
     if(original&&original.product_id!==product.id)throw new StoreError('Вариант принадлежит другому товару');
     statements.push(env.DB.prepare('INSERT INTO variants(id,product_id,sku,color,color_hex,size,stock) VALUES(?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET sku=excluded.sku,color=excluded.color,color_hex=excluded.color_hex,size=excluded.size,stock=excluded.stock').bind(v.id,product.id,v.sku,v.color,v.colorHex,v.size,v.stock));
    }
    await env.DB.batch(statements);return json({product});
   }
   const adminOrder=path.match(/^\/api\/admin\/orders\/([a-zA-Z0-9-]+)\/status$/);
   if(adminOrder&&method==='POST'){
    const input=z.object({status:z.enum(['awaiting_payment','paid','processing','shipped','delivered','cancelled']),comment:z.string().trim().max(1000).default('')}).parse(await body(request));
    const row=await authorizedOrder(request,env,adminOrder[1],user,true);
    if(!canTransition(row.status,input.status))throw new StoreError('Недопустимый переход статуса',409);
    if(input.status==='paid'&&row.status==='awaiting_payment')throw new StoreError('Оплата выполняется через демонстрационный платёж',409);
    if(input.status==='cancelled'){const result=await cancelOrder(env,row,true);if(input.comment)await env.DB.prepare('INSERT INTO order_history(id,order_id,status,created_at,comment) VALUES(?,?,?,?,?)').bind(crypto.randomUUID(),row.id,input.status,new Date().toISOString(),input.comment).run();return json(result)}
    await env.DB.batch([env.DB.prepare('UPDATE orders SET status=? WHERE id=? AND status=?').bind(input.status,row.id,row.status),env.DB.prepare('INSERT INTO order_history(id,order_id,status,created_at,comment) SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM orders WHERE id=? AND status=?)').bind(crypto.randomUUID(),row.id,input.status,new Date().toISOString(),input.comment,row.id,input.status)]);
    const updated=await env.DB.prepare('SELECT * FROM orders WHERE id=?').bind(row.id).first<OrderRow>();if(!updated||updated.status!==input.status)throw new StoreError('Статус изменён другим запросом. Обновите заказ.',409);return json({order:await orderModel(updated,env)});
   }
   if(path==='/api/admin/promos'&&method==='PUT'){const p=promoSchema.parse(await body(request));await env.DB.prepare('INSERT INTO promos(code,percent,active,expires_at,min_subtotal,max_uses) VALUES(?,?,?,?,?,?) ON CONFLICT(code) DO UPDATE SET percent=excluded.percent,active=excluded.active,expires_at=excluded.expires_at,min_subtotal=excluded.min_subtotal,max_uses=excluded.max_uses').bind(p.code,p.percent,Number(p.active),p.expiresAt,p.minSubtotal,p.maxUses).run();return json(p)}
   if(path==='/api/admin/config'&&method==='PUT'){const settings=configSchema.parse(await body(request));await env.DB.prepare("INSERT INTO shop_settings(id,value) VALUES('config',?) ON CONFLICT(id) DO UPDATE SET value=excluded.value").bind(JSON.stringify(settings)).run();return json(settings)}
  }
  return json({error:'Страница API не найдена'},404);
 }catch(error){
  if(error instanceof StoreError)return json({error:error.message,...(error.fields?{fields:error.fields}:{})},error.status);
  if(error instanceof z.ZodError){const fields:Record<string,string>={};for(const issue of error.issues)fields[issue.path.join('.')]=issue.message;return json({error:'Проверьте заполненные поля',fields},400)}
  if(String(error).includes('UNIQUE constraint'))return json({error:'Артикул, адрес или идентификатор уже используется'},409);
  return json({error:'Не удалось выполнить запрос. Повторите попытку позже.'},500);
 }
}
