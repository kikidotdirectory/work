import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, "..", "assets", "images", "wkunz");

const imageExts = new Set([
	".jpg",
	".jpeg",
	".gif",
	".png",
	".webp",
	".svg",
	".avif",
]);

export default async function() {
	const entries = await fs.readdir(ASSETS_DIR, {
		withFileTypes: true,
	});

	return entries
		.filter((entry) => entry.isFile())
		.map((entry) => entry.name)
		.filter((name) => imageExts.has(path.extname(name).toLowerCase()))
		.map((name) => `/images/wkunz/${name}`);
}
