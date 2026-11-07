import sharp from 'sharp';
const [source,key]=process.argv.slice(2);
if(!/^[a-z-]+$/.test(key))throw new Error('Invalid asset key');
const metadata=await sharp(source).metadata();
if(!metadata.hasAlpha)throw new Error('Expected transparent plate');
await sharp(source).webp({quality:90,alphaQuality:100}).toFile(`dist/assets/wok/${key}.webp`);
console.log(JSON.stringify({key,width:metadata.width,height:metadata.height,alpha:metadata.hasAlpha}));
