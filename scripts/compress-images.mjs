import sharp from "sharp";
import { readdir, stat, rename } from "fs/promises";
import { join, extname, basename } from "path";

const DIRS = [
  "public/gaming",
  "public/keyboards",
  "public/travel",
  "public/hero",
  "public/projects",
  "public/about",
];

const QUALITY = 82;
const SKIP_SMALLER_THAN = 30 * 1024; // skip files already under 30KB

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

  const { size: before } = await stat(filePath);
  if (before < SKIP_SMALLER_THAN) {
    console.log(`  skip  ${filePath} (${kb(before)}KB — already small)`);
    return;
  }

  const outPath = filePath.replace(/\.(jpg|jpeg|png|webp)$/i, ".webp");

  await sharp(filePath).webp({ quality: QUALITY }).toFile(outPath + ".tmp");

  const { size: after } = await stat(outPath + ".tmp");

  if (after >= before) {
    // compressed version is larger — keep original
    await rename(outPath + ".tmp", outPath + ".tmp.del");
    console.log(`  keep  ${filePath} (${kb(before)}KB → ${kb(after)}KB, no gain)`);
    return;
  }

  await rename(outPath + ".tmp", outPath);

  // remove original only if output path differs (i.e. was jpg/png → webp)
  if (outPath !== filePath) {
    const { rename: fsRename } = await import("fs/promises");
    const origBackup = filePath + ".bak";
    await fsRename(filePath, origBackup);
    console.log(`  ✓  ${basename(filePath)} → webp  ${kb(before)}KB → ${kb(after)}KB  (saved ${kb(before - after)}KB)`);
  } else {
    console.log(`  ✓  ${basename(filePath)}  ${kb(before)}KB → ${kb(after)}KB  (saved ${kb(before - after)}KB)`);
  }
}

function kb(bytes) {
  return (bytes / 1024).toFixed(0);
}

for (const dir of DIRS) {
  console.log(`\n📁 ${dir}`);
  let files;
  try {
    files = await readdir(dir);
  } catch {
    console.log("  (not found, skipping)");
    continue;
  }
  for (const file of files) {
    await compressFile(join(dir, file));
  }
}

console.log("\nDone. Review .bak files then delete them: find public -name '*.bak' -delete");
console.log("Also clean up any .tmp.del files: find public -name '*.tmp.del' -delete");
