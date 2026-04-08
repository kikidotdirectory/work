import lume from "lume/mod.ts";

const site = lume({
	src: "./src",
});

site
	.add("./assets", "/")
	.add("styles.css");

export default site;
