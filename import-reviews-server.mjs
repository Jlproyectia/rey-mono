import http from 'node:http';
import {writeFile} from 'node:fs/promises';
const destination=new URL('./rey-mono/google-reviews.json',import.meta.url);
http.createServer(async(req,res)=>{
 if(req.method==='GET' && req.url==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}).end('<!doctype html><html lang="es"><title>Importar reseñas verificadas</title><body><h1>Importar 300 reseñas verificadas</h1><form method="post" action="/import"><label>Reseñas JSON<textarea name="reviews" rows="12" cols="90"></textarea></label><button>Guardar reseñas</button></form></body></html>');return;}
 if(req.method!=='POST'||req.url!=='/import'||req.headers.origin!=='http://127.0.0.1:4188'){res.writeHead(403).end();return;}
 try{let body='';for await(const chunk of req){body+=chunk;if(body.length>500000)throw Error('Payload too large');}const data=JSON.parse(new URLSearchParams(body).get('reviews'));if(data.reviews.length!==300||new Set(data.reviews.map(r=>r.id)).size!==300||data.reviews.some(r=>r.rating!==5||!r.text||!/^https:\/\/www\.google\.com\/maps\/contrib\/\d+\/reviews/.test(r.profile)))throw Error('Invalid reviews');await writeFile(destination,JSON.stringify(data,null,2)+'\n');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}).end('<h1>Guardadas 300 reseñas únicas de 5 estrellas, sin imágenes.</h1>');}catch(e){res.writeHead(400).end(e.message);}
}).listen(4188,'127.0.0.1',()=>console.log('http://127.0.0.1:4188'));
