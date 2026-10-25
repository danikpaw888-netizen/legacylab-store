import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Miniflare} from 'miniflare';
import path from 'node:path';
process.env.WRANGLER_LOG_PATH??=path.resolve('.wrangler/logs');
const {unstable_splitSqlQuery}=await import('wrangler');
const origin='http://localhost:8787';
const code=await readFile('dist/worker.js','utf8');
const runtime=new Miniflare({workers:[{config:{name:'build-smoke',compatibilityDate:'2026-10-25',compatibilityFlags:['nodejs_compat'],manifest:{mainModule:'worker.js',modulesRoot:process.cwd(),modules:{'worker.js':{type:'esm',contents:code}}},env:{BASE_URL:{type:'text',value:origin},BETTER_AUTH_SECRET:{type:'text',value:'build-smoke-test-only-secret-never-deployed-2026'},DB:{type:'d1',id:'build-smoke'}}}}]});
try{
 const db=await runtime.getD1Database('DB');
 for(const file of ['migrations/0001_store.sql','seed.sql']){
  const sql=await readFile(file,'utf8');const statements=unstable_splitSqlQuery(sql);for(let i=0;i<statements.length;i+=80)await db.batch(statements.slice(i,i+80).map(s=>db.prepare(s)));
 }
 let checks=0;
 for(const route of ['/','/catalog','/product/core-01-tee','/info/about','/info/delivery','/cart','/checkout','/account','/reset-password','/admin','/collections']){
  const r=await runtime.dispatchFetch(origin+route);assert.equal(r.status,200,route);const html=await r.text();assert(html.includes('LegacyLab'),route);assert(html.includes('/assets/app.css'),route);assert(html.includes('id="bootstrap"'),route);if(['/cart','/checkout','/account','/reset-password','/admin'].includes(route))assert(html.includes('noindex,nofollow'),route);checks++;
 }
 const invalid=await runtime.dispatchFetch(origin+'/does-not-exist');assert.equal(invalid.status,404);checks++;
 for(const route of ['/assets/app.js','/assets/app.css','/images/hero.webp','/images/editorial.webp','/favicon.svg','/sitemap.xml','/robots.txt']){
  const r=await runtime.dispatchFetch(origin+route);assert.equal(r.status,200,route);assert((await r.arrayBuffer()).byteLength>20,route);checks++;
 }
 const list=await (await runtime.dispatchFetch(origin+'/api/products')).json();assert.equal(list.total,32);checks++;
 console.log(JSON.stringify({productionSmoke:'passed',checks,products:list.total}));
}finally{await runtime.dispose();}
