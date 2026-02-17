import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  // enable smart quotes
  eleventyConfig.amendLibrary("md", function (md) {
    md.set({
      typographer: true,
    });
  });

  // configure eleventy bundles
  eleventyConfig.addBundle("css");
  eleventyConfig.addBundle("html");

  // plugins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "content",
    includes: "../_includes",
    layouts: "../_includes/layouts",
    data: "../_data",
    output: "_site",
  },
};
