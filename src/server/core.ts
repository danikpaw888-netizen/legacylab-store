import { categories,type CartLine,type Product,type ShopConfig } from '../shared';
export class StoreError extends Error {constructor(message:string,public status=400,public fields?:Record<string,string>){super(message)}}
export function amounts(subtotal:number,percent:number,shippingMethod:string,config:ShopConfig){
 if(!Number.isSafeInteger(subtotal)||subtotal<0||!Number.isInteger(percent)||percent<0||percent>90)throw new StoreError('Некорректная сумма');
 const method=config.shipping.find(s=>s.id===shippingMethod);if(!method)throw new StoreError('Выберите способ доставки',400,{shippingMethod:'Выберите способ доставки'});
 const discount=Math.floor(subtotal*percent/100),shipping=subtotal-discount>=config.freeShippingThreshold?0:method.price;
 return {subtotal,discount,shipping,total:subtotal-discount+shipping};
}
export function mergeCart(a:CartLine[],b:CartLine[],products:Product[]){
 const stocks=new Map(products.flatMap(p=>p.variants.map(v=>[v.id,v.stock] as const))),merged=new Map<string,number>();
 for(const line of [...a,...b])merged.set(line.variantId,Math.min(stocks.get(line.variantId)??0,(merged.get(line.variantId)??0)+line.quantity,99));
 return Array.from(merged,([variantId,quantity])=>({variantId,quantity})).filter(x=>x.quantity>0);
}
export function filterProducts(products:Product[],params:URLSearchParams){
 const q=(params.get('q')??'').trim().toLocaleLowerCase('ru');
 let list=products.filter(p=>{
  if(p.status!=='published')return false;
  if(q&&!([p.name,p.sku,p.category,categories.find(([id])=>id===p.category)?.[1]??'',p.subcategory,p.collection,...p.variants.map(v=>v.sku)].join(' ').toLocaleLowerCase('ru').includes(q)))return false;
  for(const field of ['category','subcategory','collection'] as const)if(params.get(field)&&p[field]!==params.get(field))return false;
  if(params.has('min')&&Number(params.get('min'))>p.price/100)return false;
  if(params.has('max')&&Number(params.get('max'))<p.price/100)return false;
  if(params.get('sale')==='1'&&!p.oldPrice)return false;
  return p.variants.some(v=>(!params.get('size')||v.size===params.get('size'))&&(!params.get('color')||v.color===params.get('color'))&&(params.get('inStock')!=='1'||v.stock>0));
 });
 const sort=params.get('sort');
 list=list.sort((a,b)=>sort==='price-asc'?a.price-b.price:sort==='price-desc'?b.price-a.price:sort==='new'?Number(b.isNew)-Number(a.isNew)||a.rank-b.rank:sort==='discount'?((b.oldPrice??b.price)-b.price)/(b.oldPrice??b.price)-((a.oldPrice??a.price)-a.price)/(a.oldPrice??a.price):a.rank-b.rank);
 const total=list.length,pages=Math.max(1,Math.ceil(total/12)),page=Math.max(1,Math.min(pages,Number.parseInt(params.get('page')??'1')||1));
 return {products:list.slice((page-1)*12,page*12),total,page,pages};
}
export const canTransition=(from:string,to:string)=>from===to||({awaiting_payment:['paid','cancelled'],paid:['processing','cancelled'],processing:['shipped','cancelled'],shipped:['delivered']} as Record<string,string[]>)[from]?.includes(to)===true;
