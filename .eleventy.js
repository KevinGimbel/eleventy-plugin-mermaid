module.exports = (eleventyConfig, options) => {
  eleventyConfig.addShortcode("mermaid_js", () => {
    let src = options?.mermaid_js_src || 'https://unpkg.com/mermaid/dist/mermaid.min.js';
    return `<script async src="${src}">mermaid.initialize({ startOnLoad: true });</script>`;
  });

  const highlighter = eleventyConfig.markdownHighlighter;
  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") {
      return `<pre class="mermaid">${str}</pre>`;
    }
    if (highlighter) {
      return highlighter(str, language)
    }
    return `<pre class="${language}">${str}</a>`;
  });
  return {}
};
