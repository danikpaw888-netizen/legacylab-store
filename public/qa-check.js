/* Explicit browser QA runner. Never loaded by the storefront itself. */
(()=>{const mode=new URL(document.currentScript.src).searchParams.get('mode')||'layout';
const checks=[],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const wait=async(fn,label)=>{for(let n=0;n<160;n++){const v=fn();if(v)return v;await sleep(60)}throw Error('Timeout: '+label)};
const check=(condition,label)=>{if(!condition)throw Error(label);checks.push(label)};
const geometry=()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.getAttribute('src')).slice(0,5)});
const emit=data=>{const p=document.createElement('pre');p.id='ll-qa-report';p.hidden=true;p.textContent=JSON.stringify({...data,geometry:geometry()});document.body.append(p)};
const set=(e,value)=>{const cls=e instanceof HTMLSelectElement?HTMLSelectElement:e instanceof HTMLTextAreaElement?HTMLTextAreaElement:HTMLInputElement;Object.getOwnPropertyDescriptor(cls.prototype,'value').set.call(e,value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))};
const api=async(path,method='GET',body,token)=>{const r=await fetch(path,{method,headers:{'Content-Type':'application/json',...(token?{'X-Order-Token':token}:{})},...(body?{body:JSON.stringify(body)}:{})});let data;try{data=await r.json()}catch{data={error:'Non-JSON HTTP '+r.status}}return{status:r.status,data}};
(async()=>{try{
 if(mode==='search'){const original=window.fetch;window.fetch=async(...args)=>{if(String(args[0]).includes('/api/products'))await sleep(600);return original(...args)};document.querySelector('button[aria-label="Поиск"]').click();await wait(()=>document.querySelector('.search-modal[open] input'),'search dialog');set(document.querySelector('.search-modal input'),'Core');await sleep(350);document.querySelector('.search-field button[aria-label="Очистить поиск"]').click();await sleep(150);check(document.querySelector('.search-modal input').value==='','query cleared');check(!document.querySelector('.search-modal .loading'),'loading stopped after clear');window.fetch=original;emit({passed:true,mode,checks});return}
 if(mode!=='purchase'){await sleep(250);emit({passed:true,mode});return}
 await wait(()=>document.querySelector('.product-picture a[href^="/product/"]'),'home products');
 document.querySelector('.product-picture a[href^="/product/"]').click();
 const size=await wait(()=>document.querySelector('.size-options button:not(:disabled)'),'size choice');size.click();await sleep(100);
 document.querySelector('.favorite-detail').click();await sleep(100);
 check(JSON.parse(localStorage.getItem('ll-guest-favorites')||'[]').length>0,'favorite persists');
 document.querySelector('.add-to-cart').click();await sleep(150);
 check(JSON.parse(localStorage.getItem('ll-guest-cart')||'[]').length>0,'cart persists');
 document.querySelector('.bag-button').click();
 await wait(()=>document.querySelector('.promo-box input'),'cart UI');set(document.querySelector('.promo-box input'),'LEGACY10');document.querySelector('.promo-box form').requestSubmit();
 await wait(()=>document.querySelector('.discount-row'),'promo quote');checks.push('LEGACY10 in cart');
 document.querySelector('a[href="/checkout"]').click();
 await wait(()=>document.querySelector('input[name="email"]'),'checkout UI');
 const email='qa-'+crypto.randomUUID()+'@example.invalid';
 for(const [name,value] of Object.entries({name:'QA Demo',email,phone:'+70000000000',city:'Demo City',postalCode:'000000',address:'Demo Street 1'})){set(document.querySelector('input[name="'+name+'"]'),value);await sleep(25)}
 const consent=document.querySelector('.checkout-steps input[type="checkbox"]');consent.click();await sleep(100);
 document.querySelector('form.checkout-layout').requestSubmit();
 await wait(()=>document.querySelector('.payment-panel'),'guest order created');const id=location.pathname.split('/').pop(),token=JSON.parse(localStorage.getItem('ll-order-'+id)||'""');
 check(!!token,'secure guest access saved');
 for(const scenario of ['declined','cancelled','success']){const select=document.querySelector('.payment-panel select');set(select,scenario);await sleep(80);document.querySelector('.payment-panel button').click();await wait(()=>!document.querySelector('.payment-panel button:disabled'),'payment response');await sleep(150);const r=await api('/api/orders/'+id,'GET',null,token);check(r.status===200&&r.data.order.paymentStatus===(scenario==='success'?'paid':scenario),'payment '+scenario)}
 await wait(()=>document.querySelector('.success-box'),'payment success UI');
 const guest=await api('/api/orders/'+id,'GET',null,token);check(guest.data.order.id===id&&guest.data.order.status==='paid','same paid order after retries');
 check((await api('/api/orders/'+id)).status===404,'guest order enumeration blocked');
 const password='QA-'+crypto.randomUUID();let r=await api('/api/auth/sign-up/email','POST',{name:'QA Account',email,password,role:'admin'});check(r.status===200,'public registration');check(r.data.user.role==='user','role escalation blocked');
 r=await api('/api/me');check(r.data.user?.email===email,'session cookie works');
 const catalog=(await api('/api/products')).data;check(catalog.total===32,'catalog has 32 items');const product=catalog.products[0],variant=product.variants.find(v=>v.stock>2);
 r=await api('/api/state/merge','POST',{cart:[{variantId:variant.id,quantity:1}],favorites:[product.id]});check(r.data.cart.length===1&&r.data.favorites.includes(product.id),'account state merge');
 const payload={items:[{variantId:variant.id,quantity:1,price:product.price}],shippingMethod:'standard',contact:{name:'QA Account',email,phone:'+70000000000',city:'Demo City',address:'Demo Street 1',postalCode:'000000'},idempotencyKey:crypto.randomUUID()};
 const [first,second]=await Promise.all([api('/api/orders','POST',payload),api('/api/orders','POST',payload)]);check(first.status===201&&second.status===201&&first.data.order.id===second.data.order.id,'duplicate submit protected');
 const ownId=first.data.order.id;check((await api('/api/orders')).data.orders.some(o=>o.id===ownId),'own order history');
 r=await api('/api/orders/'+ownId+'/cancel','POST',{});check(r.data.order.status==='cancelled','account cancellation');
 await api('/api/orders/'+ownId+'/cancel','POST',{});const after=(await api('/api/products/'+product.slug)).data.product.variants.find(v=>v.id===variant.id);check(after.stock===variant.stock,'cancellation restocks once');
 check((await api('/api/admin')).status===403,'admin protected');
 await api('/api/auth/sign-out','POST',{});check((await api('/api/me')).data.user===null,'logout');r=await api('/api/auth/sign-in/email','POST',{email,password});check(r.status===200,'public login');await api('/api/auth/sign-out','POST',{});
 emit({passed:true,mode,checks,guestOrder:guest.data.order.number});
 }catch(error){emit({passed:false,mode,checks,error:error.message,uiError:document.querySelector('.error-box')?.textContent?.slice(0,180)})}})();
})();