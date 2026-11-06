import {readFileSync, writeFileSync} from 'node:fs';
const root = new URL('./rey-mono/', import.meta.url);
const reviews = [
  {name:'Conor Brundish', rating:5, url:'https://maps.app.goo.gl/e2YfJRZgmuEpzWey7', summary:'Destaca la rapidez, la comida fresca, las raciones abundantes y la facilidad para adaptar los platos.'},
  {name:'Ali', rating:4, url:'https://maps.app.goo.gl/Tu13FR276HKCLEeL6', summary:'Disfrutó la comida, aunque habría preferido el arroz frito más crujiente.'},
  {name:'Sergio Tilli', rating:5, url:'https://maps.app.goo.gl/TNYcwTfd8uNoCK5HA', summary:'Valora el sabor, los precios y el tamaño generoso de las raciones.'},
  {name:'Suze Kelly', rating:4, url:'https://maps.app.goo.gl/xDSsS91SiXmsYrbm6', summary:'Aprecia el trato amable, la cocina asiática y los precios; tiene intención de volver.'},
  {name:'Jessie Smith', rating:5, url:'https://maps.app.goo.gl/3nivaQvKS999KpjJA', summary:'Visita el restaurante con frecuencia con su marido y destaca la atención de Anthony.'},
  {name:'Holly Lamb', rating:5, url:'https://maps.app.goo.gl/LmiRF5WL9DoED1Mf8', summary:'Recomienda el restaurante por la comida y sus precios asequibles.'}
];
const file = new URL('dist/index.html', root);
let html = readFileSync(file,'utf8');
const start = html.indexOf('<div class="review-browser">');
const end = html.indexOf('<p class="review-disclosure">',start);
if(start<0 || end<0) throw new Error('Review section not found');
const cards = reviews.map(r=>`<article class="review glass" data-rating="${r.rating}"><div class="review-top"><a href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver reseña de ${r.name} en Google">${r.name}</a><span class="stars" aria-label="${r.rating} de 5 estrellas">${'★'.repeat(r.rating)}${r.rating===4?'<span class="empty-star">★</span>':''}</span></div><p>${r.summary}</p><small>Resumen en español · Reseña de Google · ${r.rating}/5</small><a class="review-source" href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="Leer reseña original de ${r.name} en Google">Leer original en Google ↗</a></article>`).join('');
html = html.slice(0,start)+`<div class="review-browser"><div class="review-browser-heading"><h3>Opiniones de nuestros clientes</h3><span>6 reseñas · 4 y 5 estrellas</span></div><p id="review-scroll-help">Desliza para descubrir más opiniones.</p><div class="review-list" role="region" aria-label="Selección de reseñas de 4 y 5 estrellas" aria-describedby="review-scroll-help" tabindex="0">${cards}</div></div></div>`+html.slice(end);
html = html.replace(/<p class="review-disclosure">[\s\S]*?<\/p>/,'<p class="review-disclosure">Selección de 6 reseñas de 4 y 5 estrellas, resumidas en español. Consulta los textos completos en Google. La valoración y el total incluyen todas las puntuaciones. Selección consultada el 6 de noviembre de 2026; no se actualiza automáticamente.</p>');
writeFileSync(file,html);
writeFileSync(new URL('google-reviews.json',root),JSON.stringify({checkedAt:'2026-11-06',rating:4.8,totalReviews:1485,contentType:'Spanish editorial summaries, not literal quotations',reviews},null,2)+'\n');
console.log(`Updated ${reviews.length} reviews with unique Google review links.`);
