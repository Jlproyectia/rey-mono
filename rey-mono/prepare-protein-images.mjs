import sharp from 'sharp';
for(const key of ['verduras','pollo','panko','ternera','langostino','pato','reymono','tofu','seitan']){
 await sharp(`dist/assets/wok/black-${key}.webp`).resize(3840).webp({quality:94,alphaQuality:100}).toFile(`dist/assets/wok/black-${key}-3840.webp`);
}
