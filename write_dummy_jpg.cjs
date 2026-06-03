const fs = require('fs');
const path = require('path');

// Tiny 1x1 JPEG (base64)
const jpgBase64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAIBAQEBAQEBAQEBAQECAgICAgQDAgICAgQDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAALCAABAAIBASIA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z';

const outDir = path.join('assets','images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const jpgPath = path.join(outDir, 'dummy-Image.jpg');
fs.writeFileSync(jpgPath, Buffer.from(jpgBase64, 'base64'));
const stat = fs.statSync(jpgPath);
console.log(`Wrote ${jpgPath} (${stat.size} bytes)`);
