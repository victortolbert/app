<div class="text-center">
  <carbon-dicom-overlay class="m-auto -mb-6 text-4xl" />
  <h3>About</h3>
</div>

### BREAKING CHANGES

* **vue:** refactor to use Vue 3 what introduces a bunch of breaking changes:

  * `Ability` instance is not a required plugin parameter. Previously, we could decide whether to pass ability as plugin parameter or as root component option. Now, the only way is to pass it in plugin:

    **Before**

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import Vue from 'vue';
    import { ability } from './services/AppAbility';

    Vue.use(abilitiesPlugin);
    new Vue({
      ability
    }).$mount('#app')
    ```

    **After**

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import { createApp } from 'vue';
    import { ability } from './services/AppAbility';

    createApp()
     .use(abilitiesPlugin, ability)
     .mount('#app');
    ```

  * `abilitiesPlugin` no more define global `$ability` and `$can` properties, instead a recommended way to get `AppAbility` instance is by injecting it through [provide/inject API](https://v3.vuejs.org/guide/component-provide-inject.html). To get previous behavior, pass `useGlobalProperties: true` option:

    **Before**

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import Vue from 'vue';
    import { ability } from './services/AppAbility';

    Vue.use(abilitiesPlugin);
    const root = new Vue({
      ability
    }).$mount('#app')

    console.log(root.$ability)
    ```

    **After**

    Recommended way:

    ```js
    import { abilitiesPlugin, ABILITY_TOKEN } from '@casl/vue';
    import { createApp } from 'vue';
    import { ability } from './services/AppAbility';

    const App = {
      name: 'App',
      inject: {
        $ability: { from: ABILITY_TOKEN }
      }
    };

    const root = createApp(App)
      .use(abilitiesPlugin, ability, {
        useGlobalProperties: true
      })
      .mount('#app');

    console.log(root.$ability)
    ```

    Backward compatible way:

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import { createApp } from 'vue';
    import { ability } from './services/AppAbility';

    const root = createApp()
      .use(abilitiesPlugin, ability, {
        useGlobalProperties: true
      })
      .mount('#app');

    console.log(root.$ability)
    ```

  * `AllCanProps<TAbility>` type was renamed to `CanProps<TAbility>`

  * `@casl/vue` no more augment vue types, so if you decide to use global properties, you will need to augment types by yourself

     **Before**

     @casl/vue augments type of `$ability` to `AnyAbility` and `$can` to `typeof $ability['can']`

     **After**

     create a separate file `src/ability-shim.d.ts` with the next content:

     ```ts
     import { AppAbility } from './AppAbility'

     declare module 'vue' {
       interface ComponentCustomProperties {
         $ability: AppAbility;
         $can(this: this, ...args: Parameters<this['$ability']['can']>): boolean;
       }
     }
     ```
