import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy({
      "./public/": "/"
    })
    .addPassthroughCopy("**/*.png")
  eleventyConfig.addPassthroughCopy("**/*.css");
  eleventyConfig.addPassthroughCopy("**/*.js");
  eleventyConfig.addPassthroughCopy("**/*.svg");

  // enable smart quotes
  eleventyConfig.amendLibrary("md", function (md) {
    md.set({
      typographer: true,
    });

    // plugins
    eleventyConfig.addPlugin(EleventyVitePlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  });
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "content",
    includes: "../_includes",
    layouts: "../_includes/layouts",
    data: "../_data",
    output: "_site"
  }
}

