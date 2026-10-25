import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Monogram paths from the updated image.svg (with white background)
const pathD_navy = `M369.41 184.47C392.2 184.69 414.98 184.74 437.78 184.64C453.07 184.61 469.05 184.27 484.17 185.5C517.08 188.17 551.33 201.44 574.47 225.61C598.82 251.02 617.32 286.08 616.6 322.01C615.86 358.45 604.07 390.84 577.85 416.38C553.9 439.76 522.68 454.29 489.37 457.54C472.76 459.27 455.53 458.81 438.8 458.7L369.9 458.61L369.71 253.18C392.75 253.03 415.78 253.04 438.81 253.22L439.11 398.46L468.23 398.46C491.03 398.43 515.24 398.05 532.51 380.18C559.56 352.18 557.53 290.59 530.62 263.44C509.62 242.25 467.75 245.45 439.77 246.08C439.31 246.09 438.84 246.1 438.37 246.12C416.84 246.95 390.64 246.28 368.86 246.29C368.8 237.4 368.01 189.46 369.41 184.47Z`;
const pathD_facet_gold = `M368.86 246.29C368.8 237.4 368.01 189.46 369.41 184.47C374.33 189.87 382.87 196.9 388.57 201.96L422.34 232.13C427.22 236.47 433.82 241.74 438.37 246.12C416.84 246.95 390.64 246.28 368.86 246.29Z`;
const pathN_right_navy = `M746.14 185.07C753.81 185.03 814.66 184.57 816.57 185.45L816.47 186.59L816.3 309.92C816.21 337.14 815.67 365.83 816.23 392.93C816.59 413.8 815.68 436.15 815.83 457.51C801.93 457.27 788.03 457.2 774.14 457.32C765.18 457.32 755.18 457.7 746.43 456.29C747.1 446.93 746.84 433.83 746.85 424.3L746.87 369.32L746.83 299.74C746.81 285.6 747.03 269.92 746.43 255.89C745.86 232.59 746.13 208.44 746.14 185.07Z`;
const pathN_topRight_gold = `M746.14 185.07C753.81 185.03 814.66 184.57 816.57 185.45L816.47 186.59C812.59 189.73 806.61 196.1 802.91 199.82L779.44 223.36C773.11 229.68 766.71 235.93 760.24 242.11C756.1 246.06 749.97 251.62 746.43 255.89C745.86 232.59 746.13 208.44 746.14 185.07Z`;
const pathN_bottomRight_gold = `M746.43 456.29C769.5 434.87 793.01 414.16 816.23 392.93C816.59 413.8 815.68 436.15 815.83 457.51C801.93 457.27 788.03 457.2 774.14 457.32C765.18 457.32 755.18 457.7 746.43 456.29Z`;
const pathN_diag_navy = `M526.9 186.42C532.66 185.84 546.76 186.17 553.09 186.15L606.39 186.22C621.84 204.61 638.55 222.67 654.59 240.58L741.78 337.64L741.72 412.9C741.77 425.63 742.4 439.09 741.99 451.65C740.97 451.35 719.96 423.74 717.78 420.92C695.36 392.29 673.25 363.39 651.49 334.24C642.36 322.18 632.3 310.25 623.68 297.86C620.48 293.23 619.26 284.19 616.89 278.4C597.8 231.9 571.97 206.21 526.9 186.42Z`;
const pathDN_overlap_gold = `M623.92 309.12C626.04 311.61 627.77 314.75 629.45 317.59C630.29 363.64 628.71 410.41 629.96 456.7C611.93 456.14 593.27 456.36 575.19 456.4L567.18 456.27C567.15 448.88 567.21 441.49 567.36 434.1C572.16 430.12 577.15 425.87 581.6 421.52C604.44 399.53 618.97 370.31 622.71 338.82C623.88 329.05 623.84 318.98 623.92 309.12Z`;

// Clean White Squircle Badge Favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e5cb80" />
      <stop offset="50%" stop-color="#c9a84e" />
      <stop offset="100%" stop-color="#9a7725" />
    </linearGradient>
  </defs>

  <!-- Crisp White Squircle Tile with Gold Accent Rim -->
  <rect x="12" y="12" width="488" height="488" rx="104" fill="#FFFFFF" stroke="url(#goldRim)" stroke-width="8" />

  <!-- Monogram in original Navy (#0C1120) and Gold (#C9A84E) -->
  <g transform="translate(256, 256) scale(0.82) translate(-592.7, -321.6)">
    <!-- Navy parts -->
    <path fill="#0C1120" d="${pathD_navy}" />
    <path fill="#0C1120" d="${pathN_right_navy}" />
    <path fill="#0C1120" d="${pathN_diag_navy}" />

    <!-- Gold facets -->
    <path fill="#C9A84E" d="${pathD_facet_gold}" />
    <path fill="#C9A84E" d="${pathN_topRight_gold}" />
    <path fill="#C9A84E" d="${pathN_bottomRight_gold}" />
    <path fill="#C9A84E" d="${pathDN_overlap_gold}" />
  </g>
</svg>`;

async function run() {
  const svgBuffer = Buffer.from(faviconSvg);

  // 1. Generate icon.svg in public and in src/app
  fs.writeFileSync('public/icon.svg', faviconSvg);
  fs.writeFileSync('src/app/icon.svg', faviconSvg);
  console.log('Written public/icon.svg and src/app/icon.svg');

  // 2. Generate PNGs: 16, 32, 48, 96, 180, 192, 512
  const sizes = [16, 32, 48, 96, 180, 192, 512];
  const pngBuffers = {};
  for (const s of sizes) {
    pngBuffers[s] = await sharp(svgBuffer).resize(s, s).png().toBuffer();
  }

  fs.writeFileSync('public/icon-48.png', pngBuffers[48]);
  fs.writeFileSync('public/icon-96.png', pngBuffers[96]);
  fs.writeFileSync('public/icon-192.png', pngBuffers[192]);
  fs.writeFileSync('public/icon-512.png', pngBuffers[512]);
  fs.writeFileSync('public/apple-touch-icon.png', pngBuffers[180]);

  // App router icon files
  fs.writeFileSync('src/app/icon.png', pngBuffers[48]);
  fs.writeFileSync('src/app/apple-icon.png', pngBuffers[180]);

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
