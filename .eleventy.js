const htmlencode = require('htmlencode');

module.exports = (eleventyConfig, options) => {
  const highlighter = eleventyConfig.markdownHighlighter;
  const html_tag = options?.html_tag || 'pre';
  const extra_classes = options?.extra_classes ? ' ' + options.extra_classes : '';
  let mermaid_config = options?.mermaid_config || {startOnLoad:true};
  let src = options?.mermaid_js_src || "https://unpkg.com/mermaid@10/dist/mermaid.esm.min.mjs";

  eleventyConfig.addShortcode("mermaid_js", () => {
    return `<script type="module" async>import mermaid from "${src}";document.addEventListener('DOMContentLoaded', mermaid.initialize(${JSON.stringify(mermaid_config)}));</script>`
  });

  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") {
      return `<${html_tag} class="mermaid${extra_classes}">${htmlencode.htmlEncode(str)}</${html_tag}>`;
    }
    if (highlighter) {
      return highlighter(str, language)
    }
    return `<pre class="${language}">${str}</pre>`;
  });
  return {}
};
