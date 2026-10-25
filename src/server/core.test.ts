import { describe,it,expect } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { amounts,mergeCart,filterProducts,canTransition } from './core';
import { defaultConfig,type Product } from '../shared';
const product:Product={id:'p1',slug:'test',sku:'LL-001',name:'Тест',category:'clothing',subcategory:'t-shirts',collection:'Core Collection',description:'',composition:'',care:'',fit:'',price:100000,oldPrice:200000,images:[],isNew:true,rank:1,status:'published',variants:[{id:'v1',productId:'p1',sku:'S1',color:'Графит',colorHex:'#222222',size:'M',stock:1},{id:'v2',productId:'p1',sku:'S2',color:'Молочный',colorHex:'#ffffff',size:'L',stock:4}]};
describe('money, filters and merge',()=>{
 it('calculates 10% once and charged delivery in integer kopecks',()=>{expect(amounts(199999,10,'standard',defaultConfig)).toEqual({subtotal:199999,discount:19999,shipping:49000,total:229000})});
 it('free delivery threshold is after discounts',()=>{expect(amounts(1500000,10,'standard',defaultConfig).shipping).toBe(49000);expect(amounts(1700000,10,'standard',defaultConfig).shipping).toBe(0)});
 it('rejects bad money and unknown shipping',()=>{expect(()=>amounts(-1,10,'standard',defaultConfig)).toThrow();expect(()=>amounts(1000,10,'bad',defaultConfig)).toThrow()});
 it('merges duplicate cart entries without exceeding inventory',()=>expect(mergeCart([{variantId:'v1',quantity:1}],[{variantId:'v1',quantity:4},{variantId:'missing',quantity:2}],[product])).toEqual([{variantId:'v1',quantity:1}]));
 it('matches size and color on the SAME variant',()=>{expect(filterProducts([product],new URLSearchParams({size:'M',color:'Молочный',inStock:'1'})).total).toBe(0);expect(filterProducts([product],new URLSearchParams({size:'L',color:'Молочный',inStock:'1'})).total).toBe(1)});
 it('omits unpublished products and filters prices as rubles',()=>{expect(filterProducts([{...product,status:'draft'}],new URLSearchParams()).total).toBe(0);expect(filterProducts([product],new URLSearchParams({max:'999'})).total).toBe(0)});
 it('sorts and searches SKU',()=>expect(filterProducts([product],new URLSearchParams({q:'ll-001',sort:'price-asc'})).products[0].id).toBe('p1'));
 it('only allows defined order transitions',()=>{expect(canTransition('paid','processing')).toBe(true);expect(canTransition('paid','delivered')).toBe(false);expect(canTransition('cancelled','paid')).toBe(false);expect(canTransition('cancelled','cancelled')).toBe(true)});
});
function fixture(){
 const db=new DatabaseSync(':memory:');db.exec(readFileSync(new URL('../../migrations/0001_store.sql',import.meta.url),'utf8'));
 db.exec("INSERT INTO products VALUES('p','slug','sku','Name','clothing','tees','Core','Description','Cotton','Wash','Regular',10000,NULL,'[]',1,1,'published'); INSERT INTO variants VALUES('v','p','vsku','Black','#000000','M',2);");
 return db;
}
function insertOrder(db:DatabaseSync,id:string,key=id,promo:string|null=null){
 db.prepare("INSERT INTO orders VALUES(?,?,NULL,'hash',?,'request','2026-10-25T00:00:00Z','awaiting_payment','pending',10000,?,49000,?,'standard','{}',?,'2099-01-01T00:00:00Z')").run(id,id,key,promo?1000:0,promo?58000:59000,promo);
}
function item(db:DatabaseSync,id:string,quantity:number,price=10000){db.prepare("INSERT INTO order_items VALUES(?,?,'v','Name','slug','/images/a.svg','Black','M',?,?)").run(id+'item',id,quantity,price)}
describe('SQLite transactions and inventory invariants',()=>{
 it('reserves stock and rolls back the full checkout on shortage',()=>{const db=fixture();db.exec('BEGIN');insertOrder(db,'a');expect(()=>item(db,'a',3)).toThrow('STOCK_UNAVAILABLE');db.exec('ROLLBACK');expect(db.prepare('SELECT count(*) AS n FROM orders').get()?.n).toBe(0);expect(db.prepare('SELECT stock FROM variants').get()?.stock).toBe(2);db.close()});
 it('second competing checkout cannot oversell',()=>{const db=fixture();db.exec('BEGIN');insertOrder(db,'a');item(db,'a',2);db.exec('COMMIT');db.exec('BEGIN');insertOrder(db,'b');expect(()=>item(db,'b',1)).toThrow('STOCK_UNAVAILABLE');db.exec('ROLLBACK');expect(db.prepare('SELECT stock FROM variants').get()?.stock).toBe(0);db.close()});
 it('unique idempotency key prohibits duplicate orders',()=>{const db=fixture();insertOrder(db,'a','same');expect(()=>insertOrder(db,'b','same')).toThrow('UNIQUE');db.close()});
 it('cancel returns stock and promo usage exactly once',()=>{const db=fixture();db.exec('BEGIN');insertOrder(db,'a','a','LEGACY10');item(db,'a',1);db.exec('COMMIT');expect(db.prepare("SELECT uses FROM promos WHERE code='LEGACY10'").get()?.uses).toBe(1);db.exec("UPDATE orders SET status='cancelled',payment_status='cancelled' WHERE id='a'; UPDATE orders SET status='cancelled' WHERE id='a';");expect(db.prepare('SELECT stock FROM variants').get()?.stock).toBe(2);expect(db.prepare("SELECT uses FROM promos WHERE code='LEGACY10'").get()?.uses).toBe(0);db.close()});
 it('expired reserves release stock',()=>{const db=fixture();insertOrder(db,'a');item(db,'a',1);db.exec("UPDATE orders SET expires_at='2020-01-01T00:00:00Z'; UPDATE orders SET status='cancelled',payment_status='cancelled' WHERE status='awaiting_payment' AND expires_at<'2026-10-25T00:00:00Z';");expect(db.prepare('SELECT stock FROM variants').get()?.stock).toBe(2);db.close()});
 it('database rejects stale price and invalid status transitions',()=>{const db=fixture();insertOrder(db,'a');expect(()=>item(db,'a',1,9999)).toThrow('PRICE_CHANGED');expect(()=>db.exec("UPDATE orders SET status='delivered' WHERE id='a'")).toThrow('INVALID_STATUS');db.close()});
 it('promo limit is atomic and cancellation makes slot available',()=>{const db=fixture();db.exec("UPDATE promos SET max_uses=1 WHERE code='LEGACY10'");insertOrder(db,'a','a','LEGACY10');expect(()=>insertOrder(db,'b','b','LEGACY10')).toThrow('PROMO_UNAVAILABLE');db.exec("UPDATE orders SET status='cancelled' WHERE id='a'");expect(()=>insertOrder(db,'b','b','LEGACY10')).not.toThrow();db.close()});
});
