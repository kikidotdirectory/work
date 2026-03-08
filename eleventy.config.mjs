import { RenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { VentoPlugin } from "eleventy-plugin-vento";
import { buildAllCss } from "./src/_config/build-css.js";

export default async function(eleventyConfig) {
	eleventyConfig.on("eleventy.before", async () => {
		await buildAllCss();
	});

	// custom watch targets
	eleventyConfig.addWatchTarget("./src/css/**/*.css");

	eleventyConfig.addPassthroughCopy({ "src/assets/": "/" });

	// enable smart quotes
	eleventyConfig.amendLibrary("md", function(md) {
		md.set({
			typographer: true,
		});
	});

	// configure eleventy bundles
	eleventyConfig.addBundle("css", { hoist: true });
	eleventyConfig.addBundle("html");

	// plugins
	// eleventyConfig.addPlugin(eleventyImageTransformPlugin);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(VentoPlugin);
}

export const config = {
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	dir: {
		input: "src/pages",
		includes: "../_includes",
		output: "dist",
	},
};
