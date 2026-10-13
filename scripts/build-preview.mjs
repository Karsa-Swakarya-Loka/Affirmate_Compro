// Inline the generated map SVG into design/preview-landing.html. Run: node scripts/build-preview.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "design/preview-landing.src.html"), "utf8");
const map = readFileSync(join(root, "design/assets/Map/indonesia-map.fragment.html"), "utf8");
writeFileSync(join(root, "design/preview-landing.html"), src.replace("<!--MAP-->", map));
console.log("design/preview-landing.html written");
