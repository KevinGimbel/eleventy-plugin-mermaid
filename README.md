# eleventy-plugin-mermaid
> Integrate [Mermaid](https://mermaid-js.github.io/mermaid/#/) with [eleventy](https://11ty.dev/)

<!-- BEGIN mktoc -->

- [Usage](#usage)
- [Config](#config)
  - [Config Options](#config-options)
  - [Config Examples](#config-examples)
    - [Inline configuration](#inline-configuration)
- [Thanks](#thanks)
- [Future ideas](#future-ideas)
- [Changelog](#changelog)
  - [2.1.1](#211)
  - [2.1.0](#210)
  - [2.0.0](#200)
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
<script type="module">import mermaid from "${src}";mermaid.initialize({startOnLoad:true});</script>
```

`${src}`contains the script source as configured (see below). You can also skip this step and provide Mermaid as part of your JS bundle.

## Config
### Config Options

Global config options, set in `eleventy.js`.

| Option      | Type | Default       | Description | 
| ----------- | ---- | ------------- | ----------- | 
| `mermaid_js_src` | String | `https://unpkg.com/mermaid@10/dist/mermaid.esm.min.mjs` | source from where Mermaid will be loaded |
| `html_tag` | String | `pre` | The wrapping HTML tag which the graph is rendered inside |
| `extra_classes` | String | `""` | Extra CSS classes assigned to the wrapping element |
| `mermaid_config` | String | `{startOnLoad: true}` | Define custom settings to be passed to `mermaid.initialize` |

### Config Examples

```js
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginMermaid, {
    // load mermaid from local assets directory
    mermaid_js_src: '/assets/mermaid.min.mjs',
    html_tag: 'div',
    extra_classes: 'graph',
    mermaid_config: {
      'startOnLoad': true,
      'theme': 'dark'
    }
  });
};
```

#### Inline configuration

It's possible to configure each graqph using mermaid's Inline configuration:


```markdown
    ```mermaid
      %%{init: {'theme':'forest'}}%%
      graph TD
      A[Public web] -->|HTTP request| B(Firewall)
      B --> C{Is port open}
      C -->|Yes| D[App]
      C -->|No| E[Return error]
    ```

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

## Changelog
### 2.1.1

- Fix closing pre tag in fallback output #5 by [@BigBlueHat](https://github.com/BigBlueHat)

### 2.1.0

- Add `document.addEventListener('DOMContentLoaded')` around mermaidJS code
- Add `async` tag to script
- Pin mermaidJS version to `10` to avoid compatibility issues in the future. This can be overwritten by setting `mermaid_js_src` and only affects users who use `{% mermaid_js %}` shortcode.

### 2.0.0

MermaidJS [switched to ESM only in version 10](https://github.com/mermaid-js/mermaid/issues/3590), which broke the old JavaScript path we used to get the script by default.

This version now uses the ESM module.
