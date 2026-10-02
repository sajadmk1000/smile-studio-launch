import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "d:/New Pitchings/ameens smile/Ameen Gallery/Treamtments images";
const DEST_DIR = "d:/New Pitchings/ameens smile/smile-studio-launch/public/clinic/treatments";

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

const MAPPING = [
  {
    slug: "smile-designing",
    file: "exec-e3945143-7733-4ee2-b00b-c07b19978070.png",
    name: "Smile Designing",
  },
  {
    slug: "orthodontics",
    file: "exec-abd288b9-d132-4638-b1f5-0a6a720d98d8.png",
    name: "Orthodontics",
  },
  {
    slug: "clear-aligners",
    file: "exec-71cd3731-f23b-43dd-ad46-8a1d855b0b03.png",
    name: "Clear Aligners",
  },
  {
    slug: "veneers",
    file: "exec-a6bf0df1-812c-4760-97eb-a9c21aebfd37.png",
    name: "Porcelain Veneers",
  },
  {
    slug: "dental-implants",
    file: "exec-e2e76faa-1064-4440-9a51-5dc6fd7efc23.png",
    name: "Dental Implants",
  },
  {
    slug: "root-canal-treatment",
    file: "exec-91f7ccbe-5517-4eba-8e93-eb545936891c.png",
    name: "Root Canal Treatment",
  },
];

async function processImages() {
  console.log("Processing treatment images...");
  for (const item of MAPPING) {
    const srcPath = path.join(SOURCE_DIR, item.file);
    if (!fs.existsSync(srcPath)) {
      console.error(`File not found: ${srcPath}`);
      continue;
    }

    const meta = await sharp(srcPath).metadata();
    console.log(`\n${item.name} (${item.slug}): ${meta.width}x${meta.height}, format=${meta.format}`);

    // High-res desktop (up to 2560px or original width, crisp webp quality 90)
    const desktopPath = path.join(DEST_DIR, `${item.slug}.webp`);
    await sharp(srcPath)
      .resize({ width: Math.min(meta.width || 1920, 2560), withoutEnlargement: true })
      .webp({ quality: 90, effort: 4 })
      .toFile(desktopPath);

    // Mobile / card optimized (960px width, quality 86)
    const mobilePath = path.join(DEST_DIR, `${item.slug}-mobile.webp`);
    await sharp(srcPath)
      .resize({ width: 960, withoutEnlargement: true })
      .webp({ quality: 86, effort: 4 })
      .toFile(mobilePath);

    // Also keep full raw 4K original copy if needed
    const rawDestPath = path.join(DEST_DIR, `${item.slug}-full.png`);
    fs.copyFileSync(srcPath, rawDestPath);

    const deskStats = fs.statSync(desktopPath);
    const mobStats = fs.statSync(mobilePath);
    console.log(`  -> ${item.slug}.webp: ${(deskStats.size / 1024).toFixed(1)} KB`);
    console.log(`  -> ${item.slug}-mobile.webp: ${(mobStats.size / 1024).toFixed(1)} KB`);
  }
  console.log("\nDone processing treatment images!");
}

processImages().catch(console.error);
