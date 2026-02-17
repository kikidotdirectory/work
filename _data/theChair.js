import path from "path";
import { promises as fs } from "fs";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, "..");
// assets dir = public/assets/the-chair/
const ASSETS_DIR = path.join(PROJECT_ROOT, "public","assets", "the-chair");
const assetsContents = await fs.readdir(ASSETS_DIR, { withFileTypes: true });
const directories = assetsContents.filter((fileEntry) =>
  fileEntry.isDirectory(),
);

let filePaths = [];
for (const directory of directories) {
  const filteredContents = [];
  const dirPath = path.join(directory.parentPath, directory.name);
  const dirContents = await fs.readdir(dirPath, { withFileTypes: true });
  const imageExts = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".avif",
  ]);
  const images = dirContents
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => imageExts.has(path.extname(name).toLowerCase()));
  const imagePaths = images.map((name) =>
    path.join("/assets","the-chair", directory.name, name),
  );
  filePaths.push(imagePaths);
}

export default async function () {
  return filePaths;
}
