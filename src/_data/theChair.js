import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, "..", "pages", "public", "assets", "the-chair");

const imageExts = new Set([
	".jpg",
	".jpeg",
	".png",
	".gif",
	".webp",
	".svg",
	".avif",
]);

export default async function() {
	const entries = await fs.readdir(ASSETS_DIR, { withFileTypes: true });

	const directories = entries.filter((entry) => entry.isDirectory());

	const filePaths = [];

	for (const dir of directories) {
		const dirContents = await fs.readdir(
			path.join(ASSETS_DIR, dir.name),
			{ withFileTypes: true },
		);

		const imagePaths = dirContents
			.filter((entry) => entry.isFile())
			.filter((entry) => imageExts.has(path.extname(entry.name).toLowerCase()))
			.map((entry) => `/assets/the-chair/${dir.name}/${entry.name}`);

		filePaths.push(imagePaths);
	}

	return filePaths;
}
