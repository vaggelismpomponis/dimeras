import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// High-contrast, transparent-background architectural monogram for crisp favicon rendering
// Uses standard W3C SVG attribute stop-color (NOT JSX stopColor)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <!-- Radiant Polished Gold Gradients -->
    <linearGradient id="favGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8e7" />
      <stop offset="25%" stop-color="#fed766" />
      <stop offset="65%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#9a7520" />
    </linearGradient>

    <linearGradient id="favGoldLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#ffe699" />
      <stop offset="100%" stop-color="#c9a84e" />
    </linearGradient>

    <linearGradient id="favGoldCurve" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#ffea9f" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#8a6718" />
    </linearGradient>
  </defs>

  <g>
    <!-- Architectural Skyline Towers inside D -->
    <path d="M 46 28 L 52 22 L 52 70 L 46 70 Z" fill="url(#favGoldLight)" opacity="0.95" />
    <path d="M 54 13 L 61 6 L 61 70 L 54 70 Z" fill="url(#favGoldLight)" />
    <path d="M 63 24 L 69 18 L 69 70 L 63 70 Z" fill="url(#favGoldLight)" opacity="0.95" />
    <path d="M 71 36 L 76 31 L 76 70 L 71 70 Z" fill="url(#favGoldLight)" opacity="0.85" />

    <!-- Letter D Spine (Left Vertical Bar) -->
    <rect x="8" y="7" width="13" height="85" rx="1.5" fill="url(#favGoldMain)" />

    <!-- Letter D Outer Curve -->
    <path
      d="M 21 7 H 60 C 85 7 98 25 98 50 C 98 75 85 92 60 92 H 21 V 78 H 60 C 75 78 83 66 83 50 C 83 34 75 21 60 21 H 21 Z"
      fill="url(#favGoldCurve)"
    />

    <!-- Letter N Left Pillar -->
    <rect x="29" y="30" width="10" height="58" rx="1" fill="url(#favGoldMain)" />

    <!-- Letter N Diagonal Crossbar -->
    <path
      d="M 29 31 L 78 78 L 78 88 L 66 88 L 29 49 Z"
      fill="url(#favGoldMain)"
    />

    <!-- Letter N Right Pillar -->
    <rect x="68" y="37" width="10" height="51" rx="1" fill="url(#favGoldMain)" />

    <!-- Architectural Foundation Base Line -->
    <rect x="6" y="92" width="89" height="3" rx="1.5" fill="url(#favGoldMain)" opacity="0.85" />
  </g>
</svg>`;

async function run() {
  const svgBuffer = Buffer.from(svg);

  // 1. Generate icon.svg in public and in src/app
  fs.writeFileSync('public/icon.svg', svg);
  fs.writeFileSync('src/app/icon.svg', svg);
  console.log('Written public/icon.svg and src/app/icon.svg with valid stop-color attributes!');

  // 2. Generate PNGs: 16, 32, 48, 96, 192, 512
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

  // App router icon file: src/app/icon.png
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
