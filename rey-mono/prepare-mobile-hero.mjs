import sharp from 'sharp';
console.log(await sharp('dist/assets/gyozas-mobile.png').metadata());
for(const width of [1024,1600,2400])await sharp('dist/assets/gyozas-mobile.png').resize(width).webp({quality:94}).toFile(`dist/assets/gyozas-mobile-${width}.webp`);
