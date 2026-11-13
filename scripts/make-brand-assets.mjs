// Generates web-ready logo files from the founder's logo JPG (brand/syncjs-logo.jpg).
// The JPG sits on a warm off-white background, so we remove it with a
// "colour to alpha" pass (keeps the gradient's soft edges), then crop:
//   public/brand/syncjs-logo.png   full stacked logo, transparent
//   public/brand/syncjs-mark.png   S+J mark only, transparent
//   src/app/icon.png               favicon (mark)
//   src/app/apple-icon.png         iOS home-screen icon (mark on canvas)
// Replace with a proper SVG trace before print use. Run: npm run brand:assets
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "brand/syncjs-logo.jpg";
const CANVAS = { r: 0xf5, g: 0xfa, b: 0xfa, alpha: 1 };

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

// Background = average of the four corners.
const px = (x, y) => (y * width + x) * 4;
const corners = [px(4, 4), px(width - 5, 4), px(4, height - 5), px(width - 5, height - 5)];
const bg = [0, 1, 2].map((c) => corners.reduce((s, i) => s + data[i + c], 0) / corners.length);

// Colour-to-alpha (GIMP style): smallest alpha that explains the pixel over bg.
for (let i = 0; i < data.length; i += 4) {
  let a = 0;
  for (let c = 0; c < 3; c++) {
    const v = data[i + c];
    const d = v < bg[c] ? (bg[c] - v) / bg[c] : bg[c] < 255 ? (v - bg[c]) / (255 - bg[c]) : 0;
    a = Math.max(a, d);
  }
  if (a < 0.04) a = 0; // kill JPEG noise in the background
  for (let c = 0; c < 3 && a > 0; c++) {
    data[i + c] = Math.round(Math.min(255, Math.max(0, (data[i + c] - bg[c]) / a + bg[c])));
  }
  data[i + 3] = Math.round(a * 255);
}

// Bounding box of opaque pixels in a horizontal band.
function bbox(y0, y1) {
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = y0; y < y1; y++)
    for (let x = 0; x < width; x++)
      if (data[px(x, y) + 3] > 40) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const raw = () => sharp(data, { raw: { width, height, channels: 4 } });
const markBox = bbox(0, Math.round(height * 0.63)); // mark sits above the wordmark
const fullBox = bbox(0, height);

await mkdir("public/brand", { recursive: true });

await raw().extract(fullBox).png().toFile("public/brand/syncjs-logo.png");

const markBuf = await raw().extract(markBox).png().toBuffer();
const side = Math.max(markBox.width, markBox.height);
const square = (pad, background) =>
  sharp(markBuf).extend({
    top: Math.round((side - markBox.height) / 2 + pad),
    bottom: Math.round((side - markBox.height) / 2 + pad),
    left: Math.round((side - markBox.width) / 2 + pad),
    right: Math.round((side - markBox.width) / 2 + pad),
    background,
  });

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
await square(0, clear).resize(256).png({ palette: true, quality: 95, compressionLevel: 9 }).toFile("public/brand/syncjs-mark.png");
await square(0, clear).png({ compressionLevel: 9 }).toFile("public/brand/syncjs-mark-lg.png");
await sharp(await square(Math.round(side * 0.04), clear).png().toBuffer()).resize(256, 256).png({ palette: true, quality: 95, compressionLevel: 9 }).toFile("src/app/icon.png");
await sharp(await square(Math.round(side * 0.18), CANVAS).flatten({ background: CANVAS }).png().toBuffer())
  .resize(180, 180).png().toFile("src/app/apple-icon.png");

console.log("bg", bg.map(Math.round), "mark", markBox, "full", fullBox);
