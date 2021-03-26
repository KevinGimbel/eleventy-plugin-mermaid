module.exports = (eleventyConfig, options) => {
  const highlighter = eleventyConfig.markdownHighlighter;
  const html_tag = options?.html_tag || 'pre';
  const extra_classes = options?.extra_classes ? ' ' + options.extra_classes : '';

  eleventyConfig.addShortcode("mermaid_js", () => {
    let src = options?.mermaid_js_src || 'https://unpkg.com/mermaid/dist/mermaid.min.js';
    return `<script async src="${src}">mermaid.initialize({ startOnLoad: true });</script>`;
  });

  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") {
      return `<${html_tag} class="mermaid${extra_classes}">${str}</${html_tag}>`;
    }
    if (highlighter) {
      return highlighter(str, language)
    }
    return `<pre class="${language}">${str}</a>`;
  });
  return {}
};
