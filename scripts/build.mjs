import {build} from 'esbuild';
import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
await mkdir('dist/client/assets',{recursive:true});
await build({entryPoints:['src/client.tsx'],bundle:true,minify:true,format:'esm',platform:'browser',target:['es2022'],outfile:'dist/client/assets/app.js',define:{'process.env.NODE_ENV':'"production"'},logLevel:'info'});
const assets={};
async function scan(dir,prefix){for(const name of await readdir(dir)){const file=path.join(dir,name),info=await stat(file);if(info.isDirectory())await scan(file,prefix+'/'+name);else{if(name==='hero.png')continue;const ext=path.extname(name),types={'.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.js':'application/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.txt':'text/plain;charset=utf-8'};assets[prefix+'/'+name]={type:types[ext]??'application/octet-stream',data:(await readFile(file)).toString('base64')}}}}
await scan('public','');await scan('dist/client/assets','/assets');
await writeFile('src/assets.generated.ts','// Generated; do not edit.\nexport const assets:Record<string,{type:string;data:string}>='+JSON.stringify(assets)+';\n');
await build({entryPoints:['src/worker.tsx'],bundle:true,minify:true,format:'esm',platform:'browser',conditions:['workerd','worker','browser'],target:['es2022'],external:['node:*','cloudflare:*'],outfile:'dist/worker.js',define:{'process.env.NODE_ENV':'"production"'},logLevel:'info'});
console.log('Worker and '+Object.keys(assets).length+' embedded static assets ready.');
