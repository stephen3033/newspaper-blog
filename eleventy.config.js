export const config = {
  dir: {
    input: "src",
    output: "_site"
  }
};

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/**/*.css"
  });

  // Blog collection
  eleventyConfig.addCollection("blog", (collection) => {
    return collection
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => {
        const dateA = new Date(a.data.date);
        const dateB = new Date(b.data.date);
        return dateB - dateA;
      });
  });

  // Songs collection
  eleventyConfig.addCollection("songs", (collection) => {
    return collection
      .getFilteredByGlob("src/songs/*.md")
      .sort((a, b) => {
        const dateA = new Date(a.data.date);
        const dateB = new Date(b.data.date);
        return dateB - dateA;
      });
  });
}
