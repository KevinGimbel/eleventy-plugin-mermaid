module.exports = (eleventyConfig, options) => {
  // control if mermaid graphs exist on page or not
  let has_mermaid_graphs = false;

  eleventyConfig.addShortcode("mermaid_js", () => {
    let src = options?.mermaid_js_src || 'https://unpkg.com/mermaid/dist/mermaid.min.js';
    if (has_mermaid_graphs) {
      // reset variable after rendering mermaid-js
      has_mermaid_graphs = false;
      return `<script async src="${src}">mermaid.initialize({ startOnLoad: true });</script>`;
    }
    return "";
  });

  const highlighter = eleventyConfig.markdownHighlighter;
  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") {
      // ensure JS code will be loaded
      has_mermaid_graphs = true;
      return `<pre class="mermaid">${str}</pre>`;
    }
    if (highlighter) {
      return highlighter(str, language)
    }
    return `<pre class="${language}">${str}</a>`;
  });
  return {}
};
