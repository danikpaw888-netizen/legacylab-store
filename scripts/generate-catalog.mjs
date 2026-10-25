import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const specs=Array.from({length:8},(_,i)=>JSON.parse(fs.readFileSync(path.join(root,'scripts/catalog-data-'+i+'.json'),'utf8'))).flat();
const colors={
bone:['Молочный','#e2dfd3'],graphite:['Графит','#30322e'],sage:['Шалфей','#858b72'],ash:['Серый меланж','#a4a5a0'],navy:['Тёмно-синий','#344453'],brown:['Песочный','#a28b6c'],lime:['Лайм','#cedc56']
};
const names={clothing:'Одежда',sneakers:'Кроссовки',accessories:'Аксессуары'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
function svg(p,index,view,color){
const dark=['#30322e','#344453'].includes(color),ink=dark?'#aeb2a3':'#55594e',line=dark?'#181b18':'#8c9082';
let drawing='';
const path=(d,extra='')=>'<path d="'+d+'" '+extra+'/>';
const stitch=(d)=>path(d,'fill="none" stroke="'+line+'" stroke-width="2" stroke-dasharray="5 4" opacity=".65"');
const logo=(x,y,w=38)=>'<g transform="translate('+x+' '+y+')" fill="none" stroke="'+ink+'" stroke-width="5"><path d="M0 0V28H18M20 0V28H38"/></g>';
const label=(x,y)=>'<g transform="translate('+x+' '+y+')"><rect width="52" height="22" fill="'+(dark?'#cdd0c5':'#454a40')+'"/><text x="26" y="14" text-anchor="middle" font-family="Arial" font-size="7" fill="'+(dark?'#33372d':'#eee')+'" letter-spacing="1">LL / LAB</text></g>';
const fabric='fill="url(#fabric)" stroke="'+line+'" stroke-width="2" stroke-linejoin="round"';
if(p.subcategory==='t-shirts'){
const long=index===3;
drawing=path(long?'M340 234L242 282L135 660L211 686L302 422L296 814Q450 832 604 814L598 422L689 686L765 660L658 282L560 234Q450 278 340 234Z':'M340 234L222 292L126 451L244 520L298 430L296 814Q450 832 604 814L602 430L656 520L774 451L678 292L560 234Q450 278 340 234Z',fabric);
drawing+=path('M340 234Q450 354 560 234L530 226Q450 294 370 226Z','fill="'+line+'" opacity=".52"')+path('M371 230Q450 279 529 230','fill="none" stroke="'+ink+'" stroke-width="4"');
drawing+=stitch('M301 791Q450 809 599 791')+stitch(long?'M148 643L218 665M682 665L752 643':'M138 438L252 504M648 504L762 438');
drawing+=path('M309 396Q327 510 316 741M581 411Q558 570 589 751','fill="none" stroke="'+line+'" stroke-width="5" opacity=".12"');
drawing+=view===1?'<text x="450" y="410" text-anchor="middle" font-family="Arial" font-size="38" fill="'+ink+'" letter-spacing="4">LEGACY</text><text x="450" y="457" text-anchor="middle" font-family="Arial" font-size="22" fill="'+ink+'" letter-spacing="13">LABORATORY</text>'+stitch('M350 480H550'):logo(525,350);
if(index===2)drawing+=path('M298 722H604','stroke="'+ink+'" stroke-width="4" opacity=".4"');
}
if(p.subcategory==='hoodies'){
const crew=index===6,zip=index===5;
drawing=path('M320 265L226 307L129 729L225 754L300 493L282 822Q450 848 618 822L600 493L675 754L771 729L674 307L580 265Z',fabric);
drawing+=path('M282 785Q450 807 618 785L618 836Q450 860 282 836Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"');
drawing+=path('M131 700L232 723L221 768L123 744ZM668 723L769 700L777 744L679 768Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"');
if(crew)drawing+=path('M320 265Q450 366 580 265L550 254Q450 314 350 254Z','fill="'+line+'" opacity=".6"');
else{
drawing+=path('M320 277Q310 167 370 144Q450 111 530 144Q590 167 580 277L513 352Q450 370 387 352Z',fabric);
drawing+=path('M355 266Q346 182 392 170Q450 146 508 170Q554 182 545 266L494 327Q450 344 406 327Z','fill="'+line+'" opacity=".7"');
drawing+=path('M352 266L416 344M548 266L484 344','stroke="'+ink+'" stroke-width="4" fill="none" opacity=".6"');
if(!zip)drawing+=path('M356 569L332 684Q450 704 568 684L544 569Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"')+stitch('M350 675Q450 690 550 675');
}
if(zip)drawing+=path('M450 327V828','stroke="'+ink+'" stroke-width="5"')+path('M440 363H460V391H440Z','fill="'+ink+'"');
drawing+=stitch('M300 794Q450 813 600 794')+logo(526,408)+label(306,774);
if(view===1)drawing+='<text x="450" y="488" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="30" letter-spacing="6" fill="'+ink+'">LEGACYLAB</text>';
}
if(p.subcategory==='trousers'){
drawing=path('M300 164Q450 146 600 164L626 461L607 935L469 935L449 503L431 935L293 935L274 461Z',fabric);
drawing+=path('M301 165Q450 146 599 165L605 213Q450 195 295 213Z','fill="'+color+'" stroke="'+line+'" stroke-width="3"');
drawing+=path('M450 203V385Q479 402 480 365V208','fill="none" stroke="'+line+'" stroke-width="3"');
drawing+=stitch('M297 220L305 324Q356 328 385 216M603 220L595 324Q544 328 515 216')+stitch('M305 909H428M472 909H595')+stitch('M449 504L361 401M449 504L539 401');
drawing+=path('M326 396Q316 640 329 872M574 396Q584 640 571 872','stroke="'+line+'" stroke-width="7" fill="none" opacity=".18"');
if(index===8)drawing+=path('M284 466L394 459L397 620L285 627ZM507 459L617 466L616 627L504 620Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"')+path('M284 480L338 510L395 474M506 474L562 510L618 480','fill="none" stroke="'+ink+'" stroke-width="3"');
if(index===10)drawing+=path('M427 199L420 285M471 199L481 285','fill="none" stroke="'+ink+'" stroke-width="4"');
if(view===1)drawing+=path('M319 267L412 267L409 372L365 394L322 372ZM488 267L581 267L578 372L534 394L491 372Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"');
drawing+=label(533,194);
}
if(p.subcategory==='outerwear'){
const puffer=index===15,overshirt=index===14;
drawing=path('M328 248L228 292L119 725L217 752L293 469L281 826Q450 847 619 826L607 469L683 752L781 725L672 292L572 248Z',fabric);
drawing+=path('M328 248L346 178L554 178L572 248L501 331L450 268L399 331Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"');
drawing+=path('M450 269V830','stroke="'+ink+'" stroke-width="6" fill="none"');
drawing+=path('M438 333H461V368H438Z','fill="'+ink+'"');
if(puffer){
drawing+=path('M326 251L574 251M278 371Q450 414 622 371M296 481Q450 522 604 481M291 596Q450 637 609 596M286 713Q450 754 614 713M213 352L151 447M195 442L135 555M181 554L125 660M687 352L749 447M705 442L765 555M719 554L775 660','fill="none" stroke="'+line+'" stroke-width="4" opacity=".65"');
}else{
drawing+=path(overshirt?'M320 369H418V485H320ZM482 369H580V485H482Z':'M315 557H412V728H315ZM488 557H585V728H488Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"');
if(overshirt)drawing+=path('M320 372L368 405L418 372M482 372L531 405L580 372','fill="none" stroke="'+ink+'" stroke-width="3"');
}
drawing+=stitch('M294 803Q450 826 606 803')+logo(516,425)+label(299,781);
if(view===1)drawing+=stitch('M287 346Q450 390 613 346');
}
if(p.subcategory==='sneakers'){
drawing='<g transform="translate(15 62) rotate(-13 450 510)">';
drawing+=path('M136 623Q174 580 211 543L308 370Q340 349 371 379L416 451Q504 445 545 396Q567 378 585 415L609 474Q637 489 681 514L742 557Q774 587 777 628Q768 695 703 708L185 708Q128 696 121 664Z','fill="'+color+'" stroke="'+line+'" stroke-width="3"');
drawing+=path('M123 628Q249 653 362 624Q460 594 555 627Q665 655 776 621L782 670Q768 717 705 726L182 726Q129 710 121 675Z','fill="'+(dark?'#42463d':'#ece9dd')+'" stroke="'+line+'" stroke-width="3"');
drawing+=path('M140 689Q300 711 452 681Q613 706 765 676','fill="none" stroke="'+line+'" stroke-width="4"');
drawing+=path('M211 543L298 407L339 462L302 551L373 598L318 631L189 635Z','fill="'+ink+'" opacity=".26"');
drawing+=path('M333 414L419 453L487 534L432 572L346 491Z','fill="'+line+'" opacity=".5"');
drawing+=path('M521 451L544 403L582 424L608 488L683 521L716 563L662 586L573 541Z','fill="'+ink+'" opacity=".3"');
drawing+=path('M195 592Q220 562 252 563L321 582L368 620M463 573Q539 511 587 545L666 591Q715 602 751 589','fill="none" stroke="'+line+'" stroke-width="3"');
drawing+=path('M334 442L401 422M345 464L420 445M361 487L439 471M381 510L458 493M401 531L474 518','fill="none" stroke="'+(dark?'#d0d3c7':'#f9f6eb')+'" stroke-width="9" stroke-linecap="round"');
drawing+=stitch('M146 657Q250 673 362 646Q460 619 556 649Q660 676 767 643')+logo(548,548);
if(index===18)drawing+=path('M161 723V739H199V726M230 727V742H270V728M310 727V743H351V726M399 725V742H441V726M488 727V743H530V730M577 727V741H618V726M662 724V737H701V720','fill="'+line+'"');
if(view===1)drawing+=path('M533 493L611 535L634 573','fill="none" stroke="'+ink+'" stroke-width="10" opacity=".4"');
drawing+='</g>';
}
if(p.subcategory==='bags'){
if(index===20){
drawing=path('M277 364Q212 161 338 128Q503 93 621 374','fill="none" stroke="'+line+'" stroke-width="34"')+path('M277 364Q212 161 338 128Q503 93 621 374','fill="none" stroke="'+color+'" stroke-width="24"');
drawing+=path('M240 381Q238 350 277 350H624Q662 350 662 389L645 729Q642 766 602 766H288Q247 766 246 725Z',fabric)+path('M249 444H651M263 587H636','stroke="'+line+'" stroke-width="4"')+path('M608 430H625V471H608Z','fill="'+ink+'"')+logo(535,625);
}else if(index===21){
drawing=path('M331 400V270Q331 185 390 185Q449 185 449 270V400M451 400V270Q451 185 510 185Q569 185 569 270V400','fill="none" stroke="'+line+'" stroke-width="34"')+path('M331 400V270Q331 185 390 185Q449 185 449 270V400M451 400V270Q451 185 510 185Q569 185 569 270V400','fill="none" stroke="'+color+'" stroke-width="26"');
drawing+=path('M218 371H682L658 835Q450 868 242 835Z',fabric)+stitch('M240 400H660M260 822Q450 847 640 822')+'<text x="450" y="595" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="34" letter-spacing="3" fill="'+ink+'">LEGACYLAB</text><text x="450" y="630" text-anchor="middle" font-family="Arial" font-size="13" letter-spacing="5" fill="'+ink+'">OBJECTS OF EVERYDAY</text>';
}else if(index===22){
drawing=path('M403 251V212Q450 161 497 212V251','fill="none" stroke="'+line+'" stroke-width="22"')+path('M265 419Q263 240 450 240Q637 240 635 419L659 786Q659 851 600 851H300Q241 851 241 786Z',fabric)+path('M269 420Q266 268 450 268Q634 268 631 420','fill="none" stroke="'+ink+'" stroke-width="6"')+path('M289 534Q450 501 611 534V746Q610 781 577 781H323Q290 781 289 746Z','fill="'+color+'" stroke="'+line+'" stroke-width="3"')+path('M293 553Q450 526 607 553','fill="none" stroke="'+ink+'" stroke-width="6"')+logo(430,626)+label(529,759);
}else{
drawing=path('M285 475L360 228Q450 160 540 228L615 475','fill="none" stroke="'+line+'" stroke-width="29"')+path('M285 475L360 228Q450 160 540 228L615 475','fill="none" stroke="'+color+'" stroke-width="21"');
drawing+=path('M197 445Q210 401 257 401H643Q690 401 703 445L741 716Q738 771 686 783H214Q162 771 159 716Z',fabric)+path('M245 421L226 768M655 421L674 768','fill="none" stroke="'+line+'" stroke-width="20" opacity=".65"')+path('M259 415H641','stroke="'+ink+'" stroke-width="7"')+logo(430,569);
}
if(view===1)drawing+=stitch('M280 702Q450 732 620 702');
}
if(p.subcategory==='headwear'){
if(index===25){
drawing=path('M270 596V430Q270 244 450 244Q630 244 630 430V596Z',fabric)+path('M255 570H645L657 747Q450 794 243 747Z','fill="'+color+'" stroke="'+line+'" stroke-width="3"');
for(let x=282;x<636;x+=14)drawing+=path('M'+x+' 590V746','stroke="'+line+'" stroke-width="3" opacity=".4"');
for(let x=300;x<620;x+=18)drawing+=path('M450 263Q'+x+' 290 '+x+' 570','fill="none" stroke="'+line+'" stroke-width="3" opacity=".25"');
drawing+=label(428,677);
}else if(index===26){
drawing=path('M292 333Q450 286 608 333L641 595L725 719Q450 808 175 719L259 595Z',fabric)+path('M259 595Q450 646 641 595M227 652Q450 719 673 652M201 690Q450 757 699 690','fill="none" stroke="'+line+'" stroke-width="3"')+stitch('M292 350Q450 310 608 350')+label(425,548);
}else{
drawing=path('M241 580Q239 315 447 300Q655 315 658 580L580 647L341 660Z',fabric)+path('M341 602Q450 558 580 603L742 742Q748 773 694 783Q454 813 256 735Q242 710 269 687Z','fill="'+color+'" stroke="'+line+'" stroke-width="3"')+path('M447 300Q371 419 367 591M447 300Q524 419 528 591','fill="none" stroke="'+line+'" stroke-width="3"')+stitch('M289 711Q470 778 703 755')+stitch('M307 689Q470 753 679 737')+logo(423,467);
drawing+='<ellipse cx="447" cy="303" rx="18" ry="9" fill="'+line+'"/>';
}
}
if(p.subcategory==='objects'){
if(index===28){
drawing='<g transform="rotate(-12 450 550)">'+path('M283 240H431L421 608Q452 654 502 682Q531 708 507 749Q489 781 440 768L271 691Q247 674 251 635Z',fabric)+path('M474 262H622L612 630Q643 676 693 704Q722 730 698 771Q680 803 631 790L462 713Q438 696 442 657Z',fabric);
for(let x=292;x<423;x+=13)drawing+=path('M'+x+' 256L'+(x-5)+' 381','stroke="'+line+'" stroke-width="2" opacity=".45"');
for(let x=484;x<614;x+=13)drawing+=path('M'+x+' 278L'+(x-5)+' 403','stroke="'+line+'" stroke-width="2" opacity=".45"');
drawing+=logo(334,408)+logo(525,430)+'</g>';
}else if(index===29){
drawing='<g transform="rotate(-25 450 550)">'+path('M236 452Q450 300 664 452L648 568Q450 413 252 568Z',fabric)+path('M252 568Q450 701 648 568L664 452Q450 580 236 452Z','fill="'+color+'" stroke="'+line+'" stroke-width="3"')+path('M363 459H517V616H363Z','fill="#646b5f" stroke="#242b23" stroke-width="6"')+path('M382 480H498V593H382Z','fill="'+color+'" stroke="#242b23" stroke-width="3"')+path('M380 536H489','stroke="#a9aea3" stroke-width="9"')+stitch('M258 587Q450 704 638 587')+'</g>';
}else if(index===30){
drawing=path('M300 176L503 214L560 826L369 864Z',fabric)+path('M430 183L621 254L510 865L319 800Z','fill="'+color+'" stroke="'+line+'" stroke-width="2"');
for(let x=0;x<12;x++)drawing+=path('M'+(321+x*16)+' '+(801+x*5)+'L'+(311+x*16)+' '+(859+x*5)+'M'+(370+x*16)+' '+(863-x*3)+'L'+(379+x*16)+' '+(916-x*3)+'','fill="none" stroke="'+color+'" stroke-width="8"');
drawing+=path('M352 714L524 762','stroke="'+ink+'" stroke-width="3" opacity=".4"')+label(410,755);
}else{
drawing='<g transform="rotate(18 450 550)"><path d="M402 346Q345 212 450 203Q555 212 498 346" fill="none" stroke="#72786b" stroke-width="21"/><path d="M407 347Q375 680 450 769Q525 680 493 347Z" fill="'+color+'" stroke="'+line+'" stroke-width="3"/><path d="M432 349Q403 669 450 714Q497 669 468 349Z" fill="#ecebe4"/><rect x="394" y="327" width="112" height="70" rx="9" fill="#51594b"/><text x="450" y="597" transform="rotate(-90 450 597)" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="17" letter-spacing="4" fill="'+ink+'">LEGACYLAB</text></g>';
}
}
return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100" role="img"><title>'+esc(p.name)+' — авторская иллюстрация LegacyLab</title><defs><linearGradient id="fabric" x1="0" x2="1"><stop stop-color="'+color+'"/><stop offset=".28" stop-color="'+color+'"/><stop offset=".52" stop-color="'+color+'"/><stop offset=".85" stop-color="'+line+'" stop-opacity=".85"/><stop offset="1" stop-color="'+color+'"/></linearGradient><radialGradient id="light"><stop stop-color="#f8f7f2"/><stop offset="1" stop-color="#eae9e2"/></radialGradient><filter id="shadow" x="-40%" y="-30%" width="180%" height="180%"><feDropShadow dx="7" dy="22" stdDeviation="15" flood-color="#34392d" flood-opacity=".14"/></filter><pattern id="grain" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#5a6053" opacity=".07"/></pattern></defs><rect width="900" height="1100" fill="url(#light)"/><ellipse cx="450" cy="950" rx="230" ry="27" fill="#767c6c" opacity=".08"/><g filter="url(#shadow)" transform="'+(view===1?'translate(30 0) rotate(4 450 550)':'rotate(-2 450 550)')+'">'+drawing+'</g><rect x="0" y="0" width="900" height="1100" fill="url(#grain)" pointer-events="none"/><text x="48" y="1048" font-family="Arial" font-size="13" letter-spacing="3" fill="#777b6f">LL / '+String(index+1).padStart(3,'0')+'</text><text x="850" y="1048" text-anchor="end" font-family="Arial" font-size="12" letter-spacing="2" fill="#777b6f">'+(view===1?'STUDY / 02':'OBJECT / 01')+'</text></svg>';
}
const products=specs.map((s,i)=>{
const [slug,name,subcategory,collection,rubles,oldRubles,description,composition,fit,colorKey]=s;
const id='p'+String(i+1).padStart(3,'0');
const category=['t-shirts','hoodies','trousers','outerwear'].includes(subcategory)?'clothing':subcategory==='sneakers'?'sneakers':'accessories';
const palette=[colorKey,colorKey==='graphite'?'bone':'graphite'];
const sizes=category==='clothing'?['XS','S','M','L','XL']:category==='sneakers'?['38','39','40','41','42','43','44']:i===26?['S/M','L/XL']:i===28?['36–40','41–45']:['ONE SIZE'];
const care=category==='sneakers'?'Очищать мягкой влажной тканью. Сушить при комнатной температуре вдали от отопительных приборов. Не стирать в машине.':
['headwear','objects'].includes(subcategory)&&(i===25||i===30)?'Ручная стирка при температуре до 30 °C со средством для шерсти. Сушить горизонтально. Не выкручивать.':
subcategory==='bags'||i===29||i===31?'Очищать влажной тканью с мягким мылом. Не использовать отбеливатель. Сушить естественным способом вдали от прямого солнца.':
'Деликатная стирка при 30 °C наизнанку с вещами похожих цветов. Не отбеливать и не сушить в машине. Гладить с изнанки на низкой температуре.';
const p={id,slug,sku:'LL-'+String(i+1).padStart(3,'0'),name,category,subcategory,collection,description,composition,care,fit,price:rubles*100,oldPrice:oldRubles?oldRubles*100:null,images:['/images/'+slug+'.svg','/images/'+slug+'-study.svg','/images/'+slug+'-graphite.svg'],variants:[],isNew:[0,4,8,12,16,22,27,31].includes(i),rank:i,status:'published'};
p.variants=palette.flatMap((k,c)=>sizes.map((size,j)=>({id:id+'-c'+c+'-s'+j,productId:id,sku:p.sku+'-'+c+'-'+j,color:colors[k][0],colorHex:colors[k][1],size,stock:(i+c+j)%7===0?0:4+(i*3+c+j)%13})));
p.images.forEach((file,j)=>fs.writeFileSync(path.join(root,'public',file),svg(p,i,j===1?1:0,colors[palette[j===2?1:0]][1]),'utf8'));
return p;
});
fs.writeFileSync(path.join(root,'src/catalog.ts'),"import type { Product } from './shared';\n\n/** Original LegacyLab demo products. All monetary values are integer kopecks. */\nexport const demoProducts: Product[] = "+JSON.stringify(products,null,2)+";\n",'utf8');
const sqlval=v=>v===null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
let sql='-- Idempotent demo catalog: never overwrites existing products, prices, or stock.\n';
for(const p of products){
const values=[p.id,p.slug,p.sku,p.name,p.category,p.subcategory,p.collection,p.description,p.composition,p.care,p.fit,p.price,p.oldPrice,JSON.stringify(p.images),p.isNew?1:0,p.rank,p.status];
sql+='INSERT OR IGNORE INTO products (id,slug,sku,name,category,subcategory,collection,description,composition,care,fit,price,old_price,images,is_new,rank,status) VALUES ('+values.map(sqlval).join(',')+');\n';
for(const v of p.variants)sql+='INSERT OR IGNORE INTO variants (id,product_id,sku,color,color_hex,size,stock) VALUES ('+[v.id,p.id,v.sku,v.color,v.colorHex,v.size,v.stock].map(sqlval).join(',')+');\n';
}
fs.writeFileSync(path.join(root,'seed.sql'),sql,'utf8');
console.log('Generated '+products.length+' products, '+products.reduce((n,p)=>n+p.variants.length,0)+' variants, '+products.length*3+' SVG illustrations.');
