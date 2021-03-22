<script>
export default {
  mounted() {
    // let root = document.documentElement

    // root.addEventListener('mousemove', e => {
    //   root.style.setProperty('--mouse-x', e.clientX + 'px')
    //   root.style.setProperty('--mouse-y', e.clientY + 'px')
    // })

    const isSameDomain = styleSheet => {
      // Internal style blocks won't have an href value
      if (!styleSheet.href) {
        return true
      }
      return styleSheet.href.indexOf(window.location.origin) === 0
    }

    const isStyleRule = rule => rule.type === 1

    /**
     * Get all custom properties on a page
     * @return array<array[string, string]>
     * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
     */
    const getCSSCustomPropIndex = () =>
      // styleSheets is array-like, so we convert it to an array.
      // Filter out any stylesheets not on this domain
      [...document.styleSheets].filter(isSameDomain).reduce(
        (finalArr, sheet) =>
          finalArr.concat(
            // cssRules is array-like, so we convert it to an array
            [...sheet.cssRules]
              .filter(isStyleRule)
              .reduce((propValArr, rule) => {
                const props = [...rule.style]
                  .map(propName => [
                    propName.trim(),
                    rule.style.getPropertyValue(propName).trim(),
                  ])
                  // Discard any props that don't start with "--". Custom props are required to.
                  .filter(([propName]) => propName.indexOf('--') === 0)

                return [...propValArr, ...props]
              }, []),
          ),
        [],
      )

    const cssCustomPropIndex = getCSSCustomPropIndex()

    // Add the swatches to the DOM
    document.querySelector('.colors').innerHTML = cssCustomPropIndex.reduce(
      (str, [prop, val]) => `${str}<li class="color">
    <b class="color__swatch" style="--color: ${val}"></b>
    <div class="color__details">
      <input value="${prop}" readonly />
      <input value="${val}" readonly />
    </div>
   </li>`,
      '',
    )
  },
}
</script>

<template>
  <div>
    <!-- <div class="mover"></div> -->
    <div
      class="absolute right-0 w-full p-2 mt-2 origin-top-right transform bg-white rounded-lg shadow-md focus:outline-none"
      aria-labelledby="headlessui-menu-button-1"
      id="headlessui-menu-items-3"
      role="menu"
      tabindex="0"
    >
      <span
        class="block w-full px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-white hover:bg-primary-500"
        id="headlessui-menu-item-4"
        role="menuitem"
        tabindex="-1"
      >
        {{ $t('edit') }} </span
      ><span
        class="block w-full px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-white hover:bg-primary-500"
        id="headlessui-menu-item-5"
        role="menuitem"
        tabindex="-1"
        >{{ $t('duplicate') }}</span
      ><span
        class="block w-full px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-white hover:bg-primary-500"
        id="headlessui-menu-item-6"
        role="menuitem"
        tabindex="-1"
        >{{ $t('share') }}</span
      ><span
        class="block w-full px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-white hover:bg-primary-500"
        id="headlessui-menu-item-7"
        role="menuitem"
        tabindex="-1"
        >{{ $t('delete') }}</span
      >
    </div>
    <h1>{{ $t('colors') }}</h1>
    <ul class="colors"></ul>
  </div>
</template>

<style>
/*You might need to refresh when you add a new custom property due to the codepen iframe*/
html {
  --color-accent: #00eb9b;
  --color-accent-secondary: #9db4ff;
  --color-accent-tertiary: #f2c0ea;
  --color-text: #292929;
  --color-divider: #d7d7d7;
}

.special {
  --color-special: #9a1f74;
}

/*
  Demo styles:
  These are only to display our color palette, they don't impact the process of reading custom properties.
*/

html {
  color: var(--color-text);
  font-family: sans-serif;
}

.colors {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}

.color {
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  transition: box-shadow 0.15s;
}

.color:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.color__swatch {
  background-color: var(--color);
  border-radius: 2px 2px 0 0;
  display: block;
  height: 11rem;
}

.color__details {
  font-size: 1.375rem;
  padding: 0.5rem;
  text-align: right;
}

.color input {
  border: 0;
  display: block;
  font-family: monospace;
  font-size: inherit;
  margin: 0;
  padding: 0.2rem;
  text-align: right;
  width: 100%;
}

.mover {
  width: 50px;
  height: 50px;
  background: red;
  position: absolute;
  left: var(--mouse-x);
  top: var(--mouse-y);
}
</style>
