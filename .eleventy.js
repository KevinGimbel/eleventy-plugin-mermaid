import pluginMermaid from "./mermaid-11ty.js";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginMermaid, {
    // load mermaid from local assets directory
    html_tag: 'div',
    extra_classes: 'graph',
    mermaid_config: {
      'startOnLoad': true,
      'theme': 'forest'
    }
  });
};