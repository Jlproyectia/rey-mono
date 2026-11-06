import {readFileSync,writeFileSync} from 'node:fs';
const file='rey-mono/dist/index.html';
let html=readFileSync(file,'utf8');
const start=html.indexOf('<div class="review-browser">');
const end=html.indexOf('<p class="review-disclosure">',start);
if(start<0||end<0)throw new Error('Review boundaries not found');
const reviews=[
 {name:'Conor Brundish',rating:5,text:'Very very tasty. Staff very kind and helpful.'},
 {name:'Ali',rating:4,text:'Everything was good and acceptable.'},
 {name:'Sergio Tilli',rating:5,text:'Great food. Everything was very tasty'},
 {name:'Jessie Smith',rating:5,text:'Love the food.'}
].filter(r=>r.rating===4||r.rating===5);
const cards=reviews.map(r=>`<article class="review glass" data-rating="${r.rating}"><div class="review-top"><span>${r.name}</span><span class="stars" aria-label="${r.rating} estrellas">${'★'.repeat(r.rating)}${r.rating<5?'<span class="empty-star">★</span>':''}</span></div><blockquote lang="en">“${r.text}”</blockquote><a class="maps-link" target="_blank" rel="noopener">Ver opiniones en Google ↗</a></article>`).join('');
html=html.slice(0,start)+`<div class="review-browser"><div class="review-browser-heading"><h3>Opiniones de nuestros clientes</h3></div><p id="review-scroll-help">Desliza para descubrir más opiniones.</p><div class="review-list" role="region" aria-label="Opiniones de nuestros clientes" aria-describedby="review-scroll-help" tabindex="0">${cards}</div></div></div>`+html.slice(end);
html=html.replace('Selección de reseñas verificadas de 3 y 4 estrellas.','Selección de reseñas verificadas de 4 y 5 estrellas.');
writeFileSync(file,html);
console.log(`Updated ${reviews.length} verified reviews; ratings: ${[...new Set(reviews.map(r=>r.rating))].join(', ')}`);
