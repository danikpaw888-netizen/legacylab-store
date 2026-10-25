import { afterAll,beforeAll,describe,expect,it } from 'vitest';
import { Miniflare } from 'miniflare';
import { unstable_splitSqlQuery } from 'wrangler';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import type { Order,Product } from '../shared';
let runtime:Miniflare;
let database:D1Database;
const origin='http://localhost:8787';
const contact={name:'Demo Buyer',email:'buyer@example.test',phone:'+70000000000',city:'Demo City',address:'Demo Street 1'};
let userCookie='',otherCookie='',userId='';
async function request(path:string,method='GET',value?:unknown,cookie='',token=''){
 const headers:Record<string,string>={Origin:origin,'Content-Type':'application/json'};
 if(cookie)headers.Cookie=cookie;if(token)headers['X-Order-Token']=token;
 const response=await runtime.dispatchFetch(origin+path,{method,headers,...(value!==undefined?{body:JSON.stringify(value)}:{})});
 return response;
}
async function signup(email:string){
 const response=await request('/api/auth/sign-up/email','POST',{name:'Demo User',email,password:'Test-only-password-2026',role:'admin'});
 expect(response.status).toBe(200);
 const body=await response.json() as {user:{id:string;role?:string}};
 const cookie=response.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ');
 expect(cookie).toContain('session_token');
 return {cookie,user:body.user};
}
async function checkout(cookie='',extra:Record<string,unknown>={}){
 const value={items:[{variantId:'v1',quantity:1}],shippingMethod:'standard',contact,idempotencyKey:crypto.randomUUID(),...extra};
 const response=await request('/api/orders','POST',value,cookie);
 return {response,value};
}
beforeAll(async()=>{
 const bundled=await build({stdin:{contents:"import {handleApi} from './src/server/api';export default {fetch:async(r,e)=>(await handleApi(r,e))??new Response('Not found',{status:404})};",resolveDir:process.cwd()},bundle:true,format:'esm',platform:'browser',conditions:['workerd','worker','browser'],external:['node:*','cloudflare:*'],target:'es2022',write:false});
 runtime=new Miniflare({workers:[{config:{name:'backend-test',compatibilityDate:'2026-10-25',compatibilityFlags:['nodejs_compat'],manifest:{mainModule:'worker.js',modulesRoot:process.cwd(),modules:{'worker.js':{type:'esm',contents:bundled.outputFiles[0].text}}},env:{BASE_URL:{type:'text',value:origin},BETTER_AUTH_SECRET:{type:'text',value:'unit-tests-only-not-a-deployment-secret-9c975c9d'},DB:{type:'d1',id:'test-database'}}}}]});
 database=await runtime.getD1Database('DB');
 const migration=await readFile(new URL('../../migrations/0001_store.sql',import.meta.url),'utf8');
 await database.batch(unstable_splitSqlQuery(migration).map(sql=>database.prepare(sql)));
 await database.exec("INSERT INTO products VALUES('p1','demo-tee','LL-001','Demo Tee','clothing','t-shirts','Core Collection','Description','Cotton','Wash cold','Regular',100000,120000,'[\"/images/demo.svg\"]',1,1,'published'); INSERT INTO variants VALUES('v1','p1','LL-001-M','Graphite','#222222','M',100); INSERT INTO variants VALUES('v2','p1','LL-001-L','Milk','#eeeeee','L',0);");
},60000);
afterAll(async()=>{await runtime?.dispose()});
describe('real Worker and D1 API integration',()=>{
 it('serves catalog and combines variant filters',async()=>{
  const list=await request('/api/products?category=clothing');
  expect(list.status).toBe(200);expect((await list.json() as {total:number}).total).toBe(1);
  const filtered=await request('/api/products?size=L&color=Graphite&inStock=1');
  expect((await filtered.json() as {total:number}).total).toBe(0);
  const product=await request('/api/products/demo-tee');expect(product.status).toBe(200);
 });
 it('registers with real Better Auth, refuses role escalation and isolates sessions',async()=>{
  const first=await signup('first@example.test');userCookie=first.cookie;userId=first.user.id;expect(first.user.role).toBe('user');
  const second=await signup('second@example.test');otherCookie=second.cookie;
  const me=await request('/api/me','GET',undefined,userCookie);expect((await me.json() as {user:{id:string}}).user.id).toBe(userId);
  expect((await request('/api/admin','GET',undefined,userCookie)).status).toBe(403);
  expect((await request('/api/admin')).status).toBe(401);
 },30000);
 it('persists and merges cart and favorites without duplicates',async()=>{
  await request('/api/state','PUT',{cart:[{variantId:'v1',quantity:1}],favorites:['p1']},userCookie);
  const merge=await request('/api/state/merge','POST',{cart:[{variantId:'v1',quantity:2}],favorites:['p1']},userCookie);
  expect(await merge.json()).toEqual({cart:[{variantId:'v1',quantity:3}],favorites:['p1']});
  expect(await (await request('/api/state','GET',undefined,userCookie)).json()).toEqual({cart:[{variantId:'v1',quantity:3}],favorites:['p1']});
  expect(await (await request('/api/state','GET',undefined,otherCookie)).json()).toEqual({cart:[],favorites:[]});
 });
 it('saves owner profile and addresses without touching another user',async()=>{
  const saved=await request('/api/profile','PUT',{name:'New Name',addresses:[{id:'home',name:'Home',city:'City',address:'Address 1',postalCode:'123',phone:'+70000000000'}]},userCookie);
  expect(saved.status).toBe(200);
  const profile=await request('/api/profile','GET',undefined,userCookie);
  const data=await profile.json() as {name:string;addresses:unknown[]};
  expect(data.name).toBe('New Name');expect(data.addresses).toHaveLength(1);
  expect((await (await request('/api/profile','GET',undefined,otherCookie)).json() as {addresses:unknown[]}).addresses).toHaveLength(0);
 });
 it('quotes server prices, discount and delivery and rejects unavailable variants',async()=>{
  const response=await request('/api/quote','POST',{items:[{variantId:'v1',quantity:1}],promoCode:'LEGACY10',shippingMethod:'standard',total:1});
  const q=await response.json() as {subtotal:number;discount:number;shipping:number;total:number};
  expect(q).toMatchObject({subtotal:100000,discount:10000,shipping:49000,total:139000});
  expect((await request('/api/quote','POST',{items:[{variantId:'v2',quantity:1}]})).status).toBe(409);
  expect((await request('/api/quote','POST',{items:[{variantId:'v1',quantity:1}],promoCode:'NOPE'})).status).toBe(400);
 });
 it('guest checkout is idempotent, protected and supports payment retry',async()=>{
  const {response,value}=await checkout('',{promoCode:'LEGACY10',total:1});
  expect(response.status).toBe(201);
  const result=await response.json() as {order:Order;accessToken:string};expect(result.order.total).toBe(139000);expect(result.accessToken).toHaveLength(64);
  const again=await request('/api/orders','POST',value);const duplicate=await again.json() as {order:Order;accessToken:string};
  expect(duplicate.order.id).toBe(result.order.id);expect(duplicate.accessToken).toBe(result.accessToken);
  expect((await request('/api/orders/'+result.order.id)).status).toBe(404);
  expect((await request('/api/orders/'+result.order.id,'GET',undefined,otherCookie)).status).toBe(404);
  expect((await request('/api/orders/'+result.order.id,'GET',undefined,'',result.accessToken)).status).toBe(200);
  const declined=await request('/api/orders/'+result.order.id+'/pay','POST',{scenario:'declined'},'',result.accessToken);
  expect((await declined.json() as {order:Order}).order).toMatchObject({id:result.order.id,status:'awaiting_payment',paymentStatus:'declined'});
  const cancelled=await request('/api/orders/'+result.order.id+'/pay','POST',{scenario:'cancelled'},'',result.accessToken);
  expect((await cancelled.json() as {order:Order}).order.status).toBe('awaiting_payment');
  const paid=await request('/api/orders/'+result.order.id+'/pay','POST',{scenario:'success'},'',result.accessToken);
  expect((await paid.json() as {order:Order}).order).toMatchObject({id:result.order.id,status:'paid',paymentStatus:'paid'});
  const paidTwice=await request('/api/orders/'+result.order.id+'/pay','POST',{scenario:'success'},'',result.accessToken);
  expect((await paidTwice.json() as {order:Order}).order.id).toBe(result.order.id);
 });
 it('simultaneous identical checkout produces one order and reserves once',async()=>{
  const before=await database.prepare("SELECT stock FROM variants WHERE id='v1'").first<{stock:number}>();
  const value={items:[{variantId:'v1',quantity:1}],shippingMethod:'standard',contact,idempotencyKey:crypto.randomUUID()};
  const responses=await Promise.all([request('/api/orders','POST',value),request('/api/orders','POST',value)]);
  const results=await Promise.all(responses.map(r=>r.json() as Promise<{order:Order}>));
  expect(results[0].order.id).toBe(results[1].order.id);
  expect((await database.prepare("SELECT stock FROM variants WHERE id='v1'").first<{stock:number}>())?.stock).toBe(before!.stock-1);
 });
 it('authenticated orders only appear in the owning account',async()=>{
  const {response}=await checkout(userCookie);expect(response.status).toBe(201);
  const {order}=await response.json() as {order:Order};
  expect(order.userId).toBe(userId);
  const mine=await request('/api/orders','GET',undefined,userCookie);expect((await mine.json() as {orders:Order[]}).orders.some(o=>o.id===order.id)).toBe(true);
  expect((await request('/api/orders/'+order.id,'GET',undefined,otherCookie)).status).toBe(404);
  const others=await request('/api/orders','GET',undefined,otherCookie);expect((await others.json() as {orders:Order[]}).orders).toHaveLength(0);
 });
 it('cancellation restores stock exactly once and rejects later payment',async()=>{
  const before=await database.prepare("SELECT stock FROM variants WHERE id='v1'").first<{stock:number}>();
  const {response}=await checkout();const {order,accessToken}=await response.json() as {order:Order;accessToken:string};
  for(let n=0;n<2;n++)expect((await request('/api/orders/'+order.id+'/cancel','POST',{},'',accessToken)).status).toBe(200);
  expect((await database.prepare("SELECT stock FROM variants WHERE id='v1'").first<{stock:number}>())?.stock).toBe(before!.stock);
  expect((await request('/api/orders/'+order.id+'/pay','POST',{scenario:'success'},'',accessToken)).status).toBe(409);
 });
 it('admin privilege comes from database; product and order actions are protected',async()=>{
  await database.prepare("UPDATE user SET role='admin' WHERE id=?").bind(userId).run();
  const admin=await request('/api/admin','GET',undefined,userCookie);expect(admin.status).toBe(200);
  const {products}=await admin.json() as {products:Product[]};
  const edited={...products[0],description:'Updated by administrator'};
  expect((await request('/api/admin/products/p1','PUT',{product:edited},userCookie)).status).toBe(200);
  expect((await request('/api/admin/products/p1','PUT',{product:edited},otherCookie)).status).toBe(403);
  const {response}=await checkout();const {order,accessToken}=await response.json() as {order:Order;accessToken:string};
  await request('/api/orders/'+order.id+'/pay','POST',{scenario:'success'},'',accessToken);
  expect((await request('/api/admin/orders/'+order.id+'/status','POST',{status:'delivered'},userCookie)).status).toBe(409);
  expect((await request('/api/admin/orders/'+order.id+'/status','POST',{status:'processing',comment:'Packed in demo packaging'},userCookie)).status).toBe(200);
  expect((await request('/api/admin/orders/'+order.id+'/status','POST',{status:'cancelled'},userCookie)).status).toBe(200);
 });
 it('rejects CSRF, malformed bodies, stale prices and reports missing reset delivery',async()=>{
  const csrf=await runtime.dispatchFetch(origin+'/api/quote',{method:'POST',headers:{Origin:'https://evil.invalid','Content-Type':'application/json'},body:'{}'});expect(csrf.status).toBe(403);
  const malformed=await runtime.dispatchFetch(origin+'/api/quote',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:'{'});expect(malformed.status).toBe(400);
  const stale=await checkout('',{items:[{variantId:'v1',quantity:1,price:1}]});expect(stale.response.status).toBe(409);
  const reset=await request('/api/auth/request-password-reset','POST',{email:'first@example.test',redirectTo:origin+'/reset-password'});expect(reset.status).toBe(503);
 });
 it('signs out and rejects invalid password on subsequent login',async()=>{
  expect((await request('/api/auth/sign-out','POST',{},otherCookie)).status).toBe(200);
  expect((await (await request('/api/me','GET',undefined,otherCookie)).json() as {user:unknown}).user).toBeNull();
  const invalid=await request('/api/auth/sign-in/email','POST',{email:'second@example.test',password:'wrong-password'});expect(invalid.status).toBe(401);
  const valid=await request('/api/auth/sign-in/email','POST',{email:'second@example.test',password:'Test-only-password-2026'});expect(valid.status).toBe(200);
 },30000);
});
