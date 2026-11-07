import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const home=await readFile('dist/index.html','utf8');
const carta=await readFile('dist/carta.html','utf8');
assert(!home.includes('id="menu-panel"'),'Menu still on homepage');
assert(!home.includes('href="#carta"'),'Old menu anchors remain');
assert(carta.includes('id="menu-panel"')&&carta.includes('aria-current="page"'),'Dedicated menu missing');
assert.equal((home.match(/class="review glass"/g)||[]).length,300);
const reviewSection=home.match(/<section class="reviews-section[\s\S]*?<\/section>/)[0];
assert(!/<img|<time/.test(reviewSection),'Review photos or dates present');
for(const text of [home,carta,await readFile('dist/app.js','utf8')])assert(!/[\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u20E3]/u.test(text),'Emoji detected');
const prompts=['verduras','pollo','panko','ternera','langostino','pato','reymono','tofu','seitan'].map(p=>({key:'black-'+p}));
assert.equal(prompts.length,9);
const hashes=new Set();let bytes=0;
for(const {key} of prompts){
 const path=`dist/assets/wok/${key}.webp`;
 const content=await readFile(path);bytes+=content.length;
 hashes.add(createHash('sha256').update(content).digest('hex'));
 const meta=await sharp(content).metadata();
 assert(meta.hasAlpha&&meta.width>=1000,`Invalid image ${key}`);
 const stats=await sharp(content).stats();
 assert(stats.channels[3].min===0,`Missing actual transparency: ${key}`);
}
assert.equal(hashes.size,9,'Images must be distinct for all combinations');
console.log(`Verified independent menu, 300 reviews, no emojis, 9 unique transparent images (${(bytes/1024/1024).toFixed(1)} MiB).`);
