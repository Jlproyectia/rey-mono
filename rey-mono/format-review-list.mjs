import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('./',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const write=(p,text)=>writeFileSync(new URL(p,root),text);
const clean=text=>text.replace(/[0-9#*]\uFE0F?\u20E3/gu,'').replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}|[\u200D\uFE0E\uFE0F\u20E3\u{1F3FB}-\u{1F3FF}]/gu,'').replace(/ {2,}/g,' ');
const svg=(name,body)=>`<svg class="ui-icon icon-${name}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
const icons={
 '↗':svg('arrow-up-right','<path d="M5 19 19 5M5 5h14v14"/>'),
 '↘':svg('arrow-down-right','<path d="m5 5 14 14M5 19h14V5"/>'),
 '↓':svg('arrow-down','<path d="M12 4v16m-7-7 7 7 7-7"/>'),
 '↑':svg('arrow-up','<path d="M12 20V4m-7 7 7-7 7 7"/>'),
 '→':svg('arrow-right','<path d="M4 12h16m-7-7 7 7-7 7"/>'),
 '←':svg('arrow-left','<path d="M20 12H4m7-7-7 7 7 7"/>'),
 '☰':svg('menu','<path d="M4 6h16M4 12h16M4 18h16"/>'),
 '×':svg('close','<path d="m6 6 12 12M6 18 18 6"/>'),
 '★':svg('star','<path fill="currentColor" stroke="none" d="m12 2.5 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-1z"/>')
};
let html=read('dist/index.html');
html=html.replace(/<nav class="review-pagination"[\s\S]*?<\/nav>/,'');
html=html.replace('class="review-list review-pages" id="review-pages"','class="review-list" id="review-list"');
html=html.replace(/(<article class="review glass"[^>]*?) hidden(?=>)/g,'$1');
html=html.replace('<p id="review-scroll-help">De más reciente a más antigua.</p>','<p id="review-scroll-help">Desliza hacia abajo para leer las 300 reseñas, de más reciente a más antigua.</p>');
// Render interface symbols as vector icons before removing pictographs in review text.
html=html.replace(/[↗↘↓↑→←☰×★]/g,char=>icons[char]);
html=clean(html);
html=html.replace(/<blockquote([^>]*)>“\s*”<\/blockquote>/g,'');
write('dist/index.html',html);
let js=read('dist/app.js');const pagination=js.indexOf('// Google review pagination');if(pagination>=0)js=js.slice(0,pagination);write('dist/app.js',js.trimEnd()+'\n');
let css=read('dist/style.css');const marker=css.indexOf('/* Paginated Google reviews */');if(marker>=0)css=css.slice(0,marker);
css+=`\n/* Scrollable reviews and vector interface icons */
.ui-icon{display:inline-block;width:1em;height:1em;vertical-align:-.15em;flex-shrink:0;pointer-events:none}
.stars{display:inline-flex;align-items:center;gap:3px;letter-spacing:0;white-space:nowrap}
.stars .ui-icon{width:1em;height:1em;vertical-align:middle}
.review-list{height:520px;max-height:65vh;display:flex;flex-direction:column;gap:14px;overflow-y:auto;overflow-x:hidden;overscroll-behavior-y:contain;scrollbar-gutter:stable;padding:4px 16px 4px 4px}
.review-list .review{display:block;flex:0 0 auto;min-width:0;padding:26px 28px}
.review-list .review blockquote{margin:18px 0;font-size:18px;overflow-wrap:anywhere}
.review-top>a:hover,.review-source:hover{color:var(--red);text-decoration:underline}
.review-top .stars{flex-shrink:0}
.review-source .ui-icon{margin-left:4px}
@media(max-width:760px){.review-list{height:460px;max-height:65vh}.review-list .review{padding:22px}.review-list .review blockquote{font-size:17px}}
`;
write('dist/style.css',css);
const data=JSON.parse(read('google-reviews.json'));
for(const review of data.reviews){review.text=clean(review.text).trim();review.name=clean(review.name).trim()||'Usuario de Google';}
write('google-reviews.json',JSON.stringify(data,null,2)+'\n');
if((html.match(/data-rating="5"/g)||[]).length!==300)throw Error('Review count changed');
if(/\p{Extended_Pictographic}|\p{Regional_Indicator}|[↗↘↓↑→←☰★]/u.test(html))throw Error('An emoji or text icon remains');
if(/review-pagination|review-pages|data-rating="4"/.test(html))throw Error('Old pagination or rating remains');
console.log('300 five-star reviews in a vertical scroll list; no emoji or text icons remain.');
