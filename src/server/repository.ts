import { defaultConfig,type Product,type Variant,type Order,type ShopConfig,type User } from '../shared';
import { auth } from './auth';
import { timingSafeEqual } from 'node:crypto';
type ProductRow={id:string;slug:string;sku:string;name:string;category:string;subcategory:string;collection:string;description:string;composition:string;care:string;fit:string;price:number;old_price:number|null;images:string;is_new:number;rank:number;status:Product['status']};
type VariantRow={id:string;product_id:string;sku:string;color:string;color_hex:string;size:string;stock:number};
export type OrderRow={id:string;number:string;user_id:string|null;guest_hash:string;idempotency_key:string;request_hash:string;created_at:string;status:string;payment_status:string;subtotal:number;discount:number;shipping:number;total:number;shipping_method:string;contact:string;promo_code:string|null;expires_at:string};
export async function products(env:Env,includeHidden=false):Promise<Product[]>{
 const [ps,vs]=await env.DB.batch<ProductRow|VariantRow>([env.DB.prepare('SELECT * FROM products'+(includeHidden?'':" WHERE status='published'")+' ORDER BY rank,id'),env.DB.prepare('SELECT * FROM variants ORDER BY id')]);
 const variants=(vs.results as VariantRow[]).map((v):Variant=>({id:v.id,productId:v.product_id,sku:v.sku,color:v.color,colorHex:v.color_hex,size:v.size,stock:v.stock}));
 return (ps.results as ProductRow[]).map(p=>({id:p.id,slug:p.slug,sku:p.sku,name:p.name,category:p.category,subcategory:p.subcategory,collection:p.collection,description:p.description,composition:p.composition,care:p.care,fit:p.fit,price:p.price,oldPrice:p.old_price,images:JSON.parse(p.images) as string[],isNew:!!p.is_new,rank:p.rank,status:p.status,variants:variants.filter(v=>v.productId===p.id)}));
}
export async function config(env:Env):Promise<ShopConfig>{const row=await env.DB.prepare("SELECT value FROM shop_settings WHERE id='config'").first<{value:string}>();return row?JSON.parse(row.value) as ShopConfig:defaultConfig}
export async function currentUser(request:Request,env:Env):Promise<User|null>{
 const s=await auth(env).api.getSession({headers:request.headers});if(!s)return null;
 return {id:s.user.id,name:s.user.name,email:s.user.email,role:s.user.role};
}
export async function orderModel(row:OrderRow,env:Env,includePrivateComments=false):Promise<Order>{
 const [items,history]=await env.DB.batch([env.DB.prepare('SELECT variant_id AS variantId,name,slug,image,color,size,quantity,price FROM order_items WHERE order_id=? ORDER BY id').bind(row.id),env.DB.prepare('SELECT status,created_at AS createdAt,comment FROM order_history WHERE order_id=? ORDER BY created_at,id').bind(row.id)]);
 return {id:row.id,number:row.number,userId:row.user_id,createdAt:row.created_at,status:row.status,paymentStatus:row.payment_status,subtotal:row.subtotal,discount:row.discount,shipping:row.shipping,total:row.total,shippingMethod:row.shipping_method,contact:JSON.parse(row.contact) as Order['contact'],items:items.results as Order['items'],history:(history.results as Order['history']).map(entry=>({...entry,comment:includePrivateComments?entry.comment:''}))};
}
export async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('')}
export function tokenHashMatches(a:string,b:string){const enc=new TextEncoder();return a.length===b.length&&timingSafeEqual(enc.encode(a),enc.encode(b))}
export async function guestToken(env:Env,id:string,key:string){
 const secret=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.BETTER_AUTH_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',secret,new TextEncoder().encode('order:'+id+':'+key))),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function cleanup(env:Env){
 const now=new Date().toISOString();
 await env.DB.batch([env.DB.prepare("UPDATE orders SET status='cancelled',payment_status='cancelled' WHERE status='awaiting_payment' AND expires_at<=?").bind(now),env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(Date.now()),env.DB.prepare('DELETE FROM verification WHERE expiresAt<?').bind(Date.now()),env.DB.prepare('DELETE FROM session WHERE expiresAt<?').bind(Date.now())]);
}
