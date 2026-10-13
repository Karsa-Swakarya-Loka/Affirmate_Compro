// Generate design/tokens.css from design/tokens.json. Run: node scripts/build-tokens.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const t = JSON.parse(readFileSync(join(root, "design/tokens.json"), "utf8"));
const lines = [`/* ${t.name} — generated from tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */`];

const theme = (id, selector) => {
  lines.push(`${selector} {`);
  for (const c of t.color.tokens) lines.push(`  --${c.name}: ${c.value[id]};`);
  lines.push(`}`);
};
theme("light", ':root, [data-theme="light"]');
theme("dark", '[data-theme="dark"]');

lines.push(`:root {`);
for (const g of t.color.gradients) lines.push(`  --${g.name}: ${g.value};`);
for (const f of t.font.families) lines.push(`  --font-${f.name}: ${f.value};`);
for (const s of t.font.styles) {
  lines.push(`  --text-${s.name}-size: ${s.size}px; --text-${s.name}-line: ${s.line}px; --text-${s.name}-weight: ${s.weight};`);
  if (s.letterSpacing) lines.push(`  --text-${s.name}-tracking: ${s.letterSpacing}px;`);
}
for (const [k, v] of Object.entries(t.space)) lines.push(`  --space-${k}: ${v}px;`);
for (const [k, v] of Object.entries(t.radius)) lines.push(`  --radius-${k}: ${v}px;`);
lines.push(`  --container: ${t.layout.container}px; --gutter: ${t.layout.gutterMobile}px; --diagonal: ${t.layout.diagonalAngle}deg; --card-bar: ${t.layout.cardTopBar}px;`);
lines.push(`  --motion-fast: ${t.motion.fast}ms; --motion-base: ${t.motion.base}ms; --motion-reveal: ${t.motion.reveal}ms; --ease: ${t.motion.easing}; --lift: ${t.motion.liftHover}px;`);
lines.push(`}`);
lines.push(`@media (min-width: 768px) { :root { --gutter: ${t.layout.gutterDesktop}px; } }`);
lines.push(`@media (max-width: 767px) { :root {`);
for (const s of t.font.styles) if (s.mobileSize) lines.push(`  --text-${s.name}-size: ${s.mobileSize}px; --text-${s.name}-line: ${s.mobileLine}px;`);
lines.push(`} }`);

writeFileSync(join(root, "design/tokens.css"), lines.join("\n") + "\n");
console.log("design/tokens.css written");
