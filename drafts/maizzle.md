## 3.2.0

### New features

#### Dynamic layouts

You can now use expressions in layout tag attribute values.

For example, you can dynamically set the Layout that a Template should extend:

```html
<extends src="src/layouts/{{ page.env === 'production' ? 'production' : 'local' }}.html">
  <block name="template">
    ...
  </block>
</extends>
```

`<block>` names can also be dynamic:

```html
<extends src="src/layouts/main.html">
  <block name="{{ page.env === 'production' ? 'template' : 'head' }}">
    ...
  </block>
</extends
```

#### Layout plugins

You can now apply PostHTML plugins to Layouts.

```js
module.exports = {
  build: {
    layouts: {
      plugins: [], // see https://github.com/posthtml/posthtml-extend#plugins
    }
  }
}
```

By default, the `posthtml-expressions` plugin is used and it includes all Maizzle `page` variables and settings you have defined for it.
