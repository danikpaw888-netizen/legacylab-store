import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './App';
import {handleApi,loadBootstrap,cleanup} from './server/api';
import {assets} from './assets.generated';
const escape=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const serialize=(value:unknown)=>JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY','Permissions-Policy':'camera=(), microphone=(), geolocation=()'};
export default {
 async fetch(request:Request,env:Env):Promise<Response>{
  const url=new URL(request.url);
  try{
   if(url.pathname==='/api/health')return Response.json({ok:true,store:'LegacyLab',mode:'demo'},{headers});
   const asset=assets[url.pathname];
   if(asset){const bytes=Uint8Array.from(atob(asset.data),c=>c.charCodeAt(0));return new Response(request.method==='HEAD'?null:bytes,{headers:{...headers,'Content-Type':asset.type,'Cache-Control':'public,max-age=86400'}});}
   const api=await handleApi(request,env);
   if(api){for(const [key,value] of Object.entries(headers))api.headers.set(key,value);return api;}
   if(request.method!=='GET'&&request.method!=='HEAD')return new Response('Method not allowed',{status:405,headers});
   const origin=new URL(env.BASE_URL).origin;
   if(url.pathname==='/robots.txt')return new Response('User-agent: *\nDisallow: /account\nDisallow: /admin\nDisallow: /cart\nDisallow: /checkout\nDisallow: /order\nDisallow: /favorites\nDisallow: /api/\nSitemap: '+origin+'/sitemap.xml',{headers:{...headers,'Content-Type':'text/plain'}});
   const bootstrap=await loadBootstrap(request,env);
   if(url.pathname==='/sitemap.xml'){const paths=['/','/catalog','/collections','/info/about','/info/delivery','/info/returns','/info/faq','/info/contacts','/info/privacy','/info/terms',...bootstrap.products.map(p=>'/product/'+p.slug)];return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+escape(origin+p)+'</loc></url>').join('')+'</urlset>',{headers:{...headers,'Content-Type':'application/xml'}});}
   const product=bootstrap.products.find(p=>'/product/'+p.slug===url.pathname);
   const titles:Record<string,string>={'/':'Создавай своё наследие','/catalog':'Каталог','/collections':'Коллекции','/info/about':'О бренде','/info/delivery':'Доставка и оплата','/info/returns':'Возврат','/info/faq':'Вопросы и ответы','/info/contacts':'Контакты','/info/privacy':'Конфиденциальность','/info/terms':'Условия демонстрации','/cart':'Корзина','/checkout':'Оформление','/account':'Личный кабинет','/favorites':'Избранное','/search':'Поиск','/admin':'Управление'};
   const title=(product?product.name:titles[url.pathname]??(url.pathname.startsWith('/order/')?'Заказ':'Страница не найдена'))+' — LegacyLab';
   const description=product?product.description:'Одежда, кроссовки и объекты на каждый день. Оригинальный демонстрационный магазин LegacyLab. Создавай своё наследие.';
   const noindex=/^\/(account|cart|checkout|admin|order|favorites|search)/.test(url.pathname);
   const known=Boolean(product||titles[url.pathname]||/^\/(order|account)\//.test(url.pathname));
   const canonical=origin+url.pathname;
   const markup=renderToString(<StaticRouter location={url.pathname+url.search}><App bootstrap={bootstrap}/></StaticRouter>);
   const schema=product?{'@context':'https://schema.org','@type':'Product',name:product.name,image:product.images.map(i=>origin+i),sku:product.sku,description:product.description,brand:{'@type':'Brand',name:'LegacyLab'},offers:{'@type':'Offer',priceCurrency:bootstrap.config.currency,price:(product.price/100).toFixed(2),availability:product.variants.some(v=>v.stock>0)?'https://schema.org/InStock':'https://schema.org/OutOfStock',url:canonical}}:null;
   const nonce=crypto.randomUUID();
   const html='<!doctype html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#171916"><title>'+escape(title)+'</title><meta name="description" content="'+escape(description)+'"><link rel="canonical" href="'+escape(canonical)+'"><meta property="og:title" content="'+escape(title)+'"><meta property="og:description" content="'+escape(description)+'"><meta property="og:type" content="'+(product?'product':'website')+'"><meta property="og:url" content="'+escape(canonical)+'"><meta property="og:image" content="'+origin+'/images/hero.webp"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/app.css">'+(url.pathname==='/'?'<link rel="preload" as="image" href="/images/hero.webp">':'')+(noindex?'<meta name="robots" content="noindex,nofollow">':'')+(schema?'<script nonce="'+nonce+'" type="application/ld+json">'+serialize(schema)+'</script>':'')+'</head><body><div id="root">'+markup+'</div><script nonce="'+nonce+'" id="bootstrap" type="application/json">'+serialize(bootstrap)+'</script><script nonce="'+nonce+'" type="module" src="/assets/app.js"></script></body></html>';
   return new Response(request.method==='HEAD'?null:html,{status:known?200:404,headers:{...headers,'Content-Type':'text/html;charset=UTF-8','Cache-Control':'private,no-store','Content-Security-Policy':"default-src 'self'; script-src 'self' 'nonce-"+nonce+"'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"}});
  }catch(error){console.error(JSON.stringify({event:'request_failed',type:error instanceof Error?error.name:'unknown',path:url.pathname}));return new Response('<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>LegacyLab — временно недоступен</title><body style="font:18px system-ui;background:#f2f1eb;color:#1b1c19;padding:10vw"><h1>LegacyLab</h1><p>Не удалось загрузить магазин. Попробуйте обновить страницу через минуту.</p><a href="/">Повторить</a></body></html>',{status:503,headers:{...headers,'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store'}});}
 },
 async scheduled(_event:ScheduledController,env:Env):Promise<void>{await cleanup(env);}
} satisfies ExportedHandler<Env>;
