import lume from "lume/mod.ts";

const site = lume({
	src: "./src",
	dest: "./dist",
});

site
	.add("./assets", "/")
	.add("styles.css");

export default site;
