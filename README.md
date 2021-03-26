# eleventy-plugin-mermaid
> Integrate [Mermaid](https://mermaid-js.github.io/mermaid/#/) with [eleventy](https://11ty.dev/)

<!-- BEGIN mktoc -->
- [Usage](#usage)
- [Config](#config)
  - [Config Options](#config-options)
  - [Config Examples](#config-examples)
- [Examples](#examples)
- [Thanks](#thanks)
- [Future ideas](#future-ideas)
<!-- END mktoc -->

## Usage

Install via npm:

```bash
npm install @kevingimbel/eleventy-plugin-mermaid
```

Include it in your `.eleventy.js` config file:

```js
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginMermaid);
};
```

Add the JavaScript code to your page (before the closing `body` tag!)

```html
{% mermaid_js %}
</body>
</html>
```

The `{% mermaid_js %}` code will render the following:

```html
<script async src="${src}">mermaid.initialize({ startOnLoad: true });</script>
```

`${src}`contains the script source as configured (see below). You can also skip this step and provide Mermaid as part of your JS bundle.

## Config
### Config Options

Global config options, set in `eleventy.js`.

| Option      | Type | Default       | Description | 
| ----------- | ---- | ------------- | ----------- | 
| `mermaid_js_src` | String | `https://unpkg.com/mermaid/dist/mermaid.min.js` | source from where Mermaid will be loaded |
| `html_tag` | String | `pre` | The wrapping HTML tag which the graph is rendered inside |
| `extra_classes` | String | `""` | Extra CSS classes assigned to the wrapping element |

### Config Examples

```js
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginMermaid, {
    // load mermaid from local assets directory
    mermaid_js_src: '/assets/mermaid.min.js',
    html_tag: 'div',
    extra_classes: 'graph'
  });
};
```

## Examples

The plugin extends the 11ty markdown highlighter so mermaid diagrams can be written inline via code blocks marked with `mermaid`:

```markdown
    ```mermaid
      graph TD;
      A[Want graphs in 11ty] -->|Search Plugin| B(Found plugin);
      B --> C{Use plugin?};
      C -->|Yes| D[NICE GRAPHS];
      C -->|No| E[NO GRAPHS];
    ```
```

## Thanks

The code is mainly taken from [https://cornishweb.com/index.php/2019/05/25/using-mermaid-js-with-eleventy-io/](https://cornishweb.com/index.php/2019/05/25/using-mermaid-js-with-eleventy-io/).

## Future ideas

- generate SVG server-side during build