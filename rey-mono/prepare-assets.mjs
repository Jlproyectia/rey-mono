import sharp from 'sharp';
import {copyFile,mkdir} from 'node:fs/promises';
await mkdir('dist/assets/vendor',{recursive:true});
for(const name of ['gsap','ScrollTrigger']) await copyFile(`node_modules/gsap/dist/${name}.min.js`,`dist/assets/vendor/${name}.min.js`);
await copyFile('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2','dist/assets/manrope.woff2');
await copyFile('node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2','dist/assets/bebas.woff2');
for(const name of ['gyozas','noodles']) {
 console.log(name,await sharp(`dist/assets/${name}-editorial.png`).metadata());
 for(const width of [800,1600,2400,3840]) await sharp(`dist/assets/${name}-editorial.png`).resize(width).webp({quality:width===3840?94:86}).toFile(`dist/assets/${name}-${width}.webp`);
}
await sharp('dist/assets/terraza.jpg').resize({width:1600,withoutEnlargement:true}).webp({quality:88}).toFile('dist/assets/terraza.webp');
