import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="10" fill="#090d12"/>
  <path d="M13 47V17h15c14 0 23 5 23 15s-9 15-23 15H13zm10-9h6c8 0 12-2 12-6s-4-6-12-6h-6v12z" fill="#c9a84e"/>
</svg>`;

async function run() {
  const svgBuffer = Buffer.from(svg);

  // 1. Generate icon.svg in public
  fs.writeFileSync('public/icon.svg', svg);
  console.log('Written public/icon.svg');

  // 2. Generate PNGs: 48x48 (Google's ideal multiple), 96x96, 192x192, 512x512
  const sizes = [16, 32, 48, 96, 192, 512];
  const pngBuffers = {};
  for (const s of sizes) {
    pngBuffers[s] = await sharp(svgBuffer).resize(s, s).png().toBuffer();
  }

  fs.writeFileSync('public/icon-48.png', pngBuffers[48]);
  fs.writeFileSync('public/icon-96.png', pngBuffers[96]);
  fs.writeFileSync('public/icon-192.png', pngBuffers[192]);
  fs.writeFileSync('public/icon-512.png', pngBuffers[512]);
  fs.writeFileSync('public/apple-touch-icon.png', pngBuffers[192]);

  // App router icon file: src/app/icon.png (Next.js automatically serves this at /icon.png with <link rel="icon">)
  fs.writeFileSync('src/app/icon.png', pngBuffers[48]);
  fs.writeFileSync('src/app/apple-icon.png', pngBuffers[192]);

  // 3. Generate multi-size favicon.ico containing 16x16, 32x32, 48x48 PNGs
  const icoSizes = [16, 32, 48];
  const count = icoSizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + 16 * count;
  const dirEntries = [];
  const imageChunks = [];

  for (const s of icoSizes) {
    const png = pngBuffers[s];
    imageChunks.push(png);

    const entry = Buffer.alloc(16);
    entry.writeUInt8(s === 256 ? 0 : s, 0); // width
    entry.writeUInt8(s === 256 ? 0 : s, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(png.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);

    offset += png.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...imageChunks]);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('Successfully created multi-size favicon.ico (16, 32, 48) of size:', icoBuffer.length);
}

run().catch(console.error);
