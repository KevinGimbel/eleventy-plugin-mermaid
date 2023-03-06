const htmlencode = require('htmlencode');

module.exports = (eleventyConfig, options) => {
  const highlighter = eleventyConfig.markdownHighlighter;
  const html_tag = options?.html_tag || 'pre';
  const extra_classes = options?.extra_classes ? ' ' + options.extra_classes : '';

  eleventyConfig.addShortcode("mermaid_js", () => {
    let src = options?.mermaid_js_src || "https://unpkg.com/mermaid@10/dist/mermaid.esm.min.mjs";
    return `<script type="module" async>import mermaid from "${src}";document.addEventListener('DOMContentLoaded', mermaid.initialize({startOnLoad:true}));</script>`
  });

  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") {
      return `<${html_tag} class="mermaid${extra_classes}">${htmlencode.htmlEncode(str)}</${html_tag}>`;
    }
    if (highlighter) {
      return highlighter(str, language)
    }
    return `<pre class="${language}">${str}</a>`;
  });
  return {}
};
