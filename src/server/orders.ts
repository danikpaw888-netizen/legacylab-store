import type { CartLine,CartItem,User } from '../shared';
import { amounts,StoreError } from './core';
import { config,products,orderModel,digest,guestToken,tokenHashMatches,type OrderRow } from './repository';
import { checkoutSchema,quoteSchema } from './validation';
import type { z } from 'zod';
type PromoRow={code:string;percent:number;active:number;expires_at:string|null;min_subtotal:number;max_uses:number|null;uses:number};
export async function quote(env:Env,input:z.infer<typeof quoteSchema>){
 const [catalog,settings]=await Promise.all([products(env),config(env)]);
 const merged=new Map<string,CartLine>();
 for(const l of input.items){const prev=merged.get(l.variantId);merged.set(l.variantId,{...l,quantity:l.quantity+(prev?.quantity??0)})}
 const items:CartItem[]=[],warnings:string[]=[];
 for(const line of merged.values()){
  const product=catalog.find(p=>p.variants.some(v=>v.id===line.variantId)),variant=product?.variants.find(v=>v.id===line.variantId);
  if(!product||!variant)throw new StoreError('Товар больше недоступен. Удалите его из корзины.',409);
  if(line.quantity>99||variant.stock<line.quantity)throw new StoreError('Недостаточно товара «'+product.name+'»: доступно '+variant.stock+'. Измените количество в корзине.',409);
  if(line.price!==undefined&&line.price!==product.price)warnings.push('Цена «'+product.name+'» изменилась. Проверьте обновлённую сумму.');
  items.push({...line,price:product.price,product,variant});
 }
 const subtotal=items.reduce((sum,i)=>sum+i.product.price*i.quantity,0);
 const code=input.promoCode?.trim().toUpperCase()||null;
 let percent=0;
 if(code){
  const p=await env.DB.prepare('SELECT * FROM promos WHERE code=?').bind(code).first<PromoRow>();
  if(!p||!p.active||(p.expires_at&&p.expires_at<=new Date().toISOString())||(p.max_uses!==null&&p.uses>=p.max_uses))throw new StoreError('Промокод не действует или лимит применений исчерпан.',400,{promoCode:'Проверьте промокод'});
  if(subtotal<p.min_subtotal)throw new StoreError('Сумма товаров ниже минимальной для этого промокода.',400,{promoCode:'Недостаточная сумма заказа'});
  percent=p.percent;
 }
 return {items,...amounts(subtotal,percent,input.shippingMethod,settings),promoCode:code,warnings};
}
async function duplicate(env:Env,row:OrderRow,user:User|null,requestHash:string){
 if(row.request_hash!==requestHash||row.user_id!==(user?.id??null))throw new StoreError('Ключ оформления уже использован. Обновите страницу заказа.',409);
 const order=await orderModel(row,env);
 return {order,...(!user?{accessToken:await guestToken(env,row.id,row.idempotency_key)}:{})};
}
export async function createOrder(env:Env,input:z.infer<typeof checkoutSchema>,user:User|null){
 const requestHash=await digest(JSON.stringify({...input,contact:{...input.contact,email:input.contact.email.toLowerCase()}}));
 const previous=await env.DB.prepare('SELECT * FROM orders WHERE idempotency_key=?').bind(input.idempotencyKey).first<OrderRow>();
 if(previous)return duplicate(env,previous,user,requestHash);
 const q=await quote(env,input);
 if(q.warnings.length)throw new StoreError(q.warnings.join(' '),409);
 const id=crypto.randomUUID(),token=await guestToken(env,id,input.idempotencyKey),hash=await digest(token),now=new Date().toISOString(),expires=new Date(Date.now()+30*60*1000).toISOString();
 const number='LL-'+now.slice(2,10).replaceAll('-','')+'-'+id.slice(0,8).toUpperCase();
 const statements=[env.DB.prepare("INSERT INTO orders(id,number,user_id,guest_hash,idempotency_key,request_hash,created_at,status,payment_status,subtotal,discount,shipping,total,shipping_method,contact,promo_code,expires_at) VALUES(?,?,?,?,?,?,?,'awaiting_payment','pending',?,?,?,?,?,?,?,?)").bind(id,number,user?.id??null,hash,input.idempotencyKey,requestHash,now,q.subtotal,q.discount,q.shipping,q.total,input.shippingMethod,JSON.stringify(input.contact),q.promoCode,expires)];
 for(const [i,line] of q.items.entries())statements.push(env.DB.prepare('INSERT INTO order_items(id,order_id,variant_id,name,slug,image,color,size,quantity,price) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id+'-'+i,id,line.variant.id,line.product.name,line.product.slug,line.product.images[0]??'',line.variant.color,line.variant.size,line.quantity,line.product.price));
 try{await env.DB.batch(statements)}catch(error){
  const existing=await env.DB.prepare('SELECT * FROM orders WHERE idempotency_key=?').bind(input.idempotencyKey).first<OrderRow>();
  if(existing)return duplicate(env,existing,user,requestHash);
  const msg=String(error);
  if(msg.includes('STOCK_UNAVAILABLE'))throw new StoreError('Товар только что закончился. Вернитесь в корзину и измените количество.',409);
  if(msg.includes('PRICE_CHANGED'))throw new StoreError('Цена товара изменилась. Вернитесь в корзину для пересчёта.',409);
  if(msg.includes('PROMO_UNAVAILABLE'))throw new StoreError('Промокод больше недоступен. Удалите его и повторите оформление.',409);
  throw error;
 }
 const row=await env.DB.prepare('SELECT * FROM orders WHERE id=?').bind(id).first<OrderRow>();
 if(!row)throw new StoreError('Не удалось получить заказ',500);
 return {order:await orderModel(row,env),...(!user?{accessToken:token}:{})};
}
export async function authorizedOrder(request:Request,env:Env,id:string,user:User|null,admin=false){
 const row=await env.DB.prepare('SELECT * FROM orders WHERE id=?').bind(id).first<OrderRow>();
 if(!row)throw new StoreError('Заказ не найден',404);
 if((admin&&user?.role==='admin')||(row.user_id&&row.user_id===user?.id))return row;
 const token=request.headers.get('X-Order-Token');
 if(!row.user_id&&token&&token.length===64&&tokenHashMatches(await digest(token),row.guest_hash))return row;
 throw new StoreError('Заказ не найден или доступ истёк. Войдите в свой аккаунт либо используйте сохранённый ключ заказа.',404);
}
export async function payOrder(env:Env,row:OrderRow,scenario:'success'|'declined'|'cancelled'){
 if(row.status==='cancelled')throw new StoreError('Резерв заказа истёк или заказ отменён. Создайте новый заказ.',409);
 if(row.payment_status==='paid')return {order:await orderModel(row,env)};
 if(row.status!=='awaiting_payment')throw new StoreError('Заказ нельзя оплатить в текущем статусе.',409);
 const now=new Date().toISOString();
 const update=scenario==='success'?env.DB.prepare("UPDATE orders SET status='paid',payment_status='paid' WHERE id=? AND status='awaiting_payment' AND expires_at>?").bind(row.id,now):env.DB.prepare("UPDATE orders SET payment_status=? WHERE id=? AND status='awaiting_payment' AND expires_at>?").bind(scenario,row.id,now);
 await env.DB.batch([update,env.DB.prepare("INSERT INTO payments(id,order_id,scenario,created_at) SELECT ?,?,?,? WHERE EXISTS(SELECT 1 FROM orders WHERE id=? AND status<>'cancelled')").bind(crypto.randomUUID(),row.id,scenario,now,row.id)]);
 const updated=await env.DB.prepare('SELECT * FROM orders WHERE id=?').bind(row.id).first<OrderRow>();
 if(!updated)throw new StoreError('Заказ не найден',404);
 if(updated.status==='awaiting_payment'&&updated.expires_at<=now)throw new StoreError('Время резерва истекло. Создайте новый заказ.',409);
 return {order:await orderModel(updated,env)};
}
export async function cancelOrder(env:Env,row:OrderRow,admin=false){
 if(row.status==='cancelled')return {order:await orderModel(row,env)};
 if(!['awaiting_payment',...(admin?['paid','processing']:[])].includes(row.status))throw new StoreError('Заказ в этом статусе нельзя отменить самостоятельно.',409);
 await env.DB.prepare("UPDATE orders SET status='cancelled',payment_status=CASE WHEN payment_status='paid' THEN 'refunded' ELSE 'cancelled' END WHERE id=? AND status IN ("+(admin?"'awaiting_payment','paid','processing'":"'awaiting_payment'")+")").bind(row.id).run();
 const updated=await env.DB.prepare('SELECT * FROM orders WHERE id=?').bind(row.id).first<OrderRow>();
 if(!updated)throw new StoreError('Заказ не найден',404);
 return {order:await orderModel(updated,env)};
}
