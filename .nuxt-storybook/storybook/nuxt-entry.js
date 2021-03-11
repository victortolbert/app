// Vue framework entry point, based on @storybook/vue@6.0.5
// https://github.com/storybookjs/storybook/blob/next/app/vue/src/client/preview/index.ts
import Vue from 'vue'
import React from 'react'
import fetch from 'unfetch'
import '@storybook/vue/dist/client/preview/globals'
import { extractProps } from '@storybook/vue/dist/client/preview/util'
import fetchMixin from '../mixins/fetch.client'
import { createApp } from '../'

/**
 * @nuxtjs/storybook
 * execute plugin scripts
 */
window.__NUXT__ = { config: {"auth":{"cookieName":"idToken","clientId":"462364873905-pshoug4pfdd74iso13km6n7hg88s2ova.apps.googleusercontent.com"},"algolia":{"appId":"WTEU7RU64C","key":"0bdd840be2d7d4377e10b238bc731901"},"apiURL":"https://api.victortolbert.com","awsS3DefaultRegion":"us-east-1","awsS3AccessKey":"AKIAXGYXHSXXHYBR5HOE","awsS3AccessSecret":"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","awsS3Bucket":"victortolbert","awsS3Url":"https://the_url.s3.amazonaws.co","assetsURL":"http://localhost:8686/assets","baseURL":"http://example-app.test","ackeeDomainId":"601bbeb1-8a0a-4d5d-ba1f-a75ce1cefda3","calendlyApiKey":"LCCHKGMJC2UDJQM6TXZQF4IZUDOB7QO3","contentApiUrl":"http://localhost:8686/_content","githubCallbackUrl":"http://laravel-7.test/login/github/callback","githubClientId":"e95268cd14d26f7628e7","githubClientSecret":"3f4f1c158f84198da82bff5087227fc7417a2293","githubToken":"87f7875f1b84f0ac61310280b14496c8864f2e8f","googleAnalyticsId":"UA-76464598-5","googleApiKey":"AIzaSyBiqWapJFvSp4uetA7QROuWbs3L3hDWOVI","googleCallbackUrl":"https://local-dashboard.boosterthon.com/v3/oauth/google","googleClientId":"10606724298-0cc8ggrgapoihqshq6gfj7nc7je23q88.apps.googleusercontent.com","googleClientSecret":"w5XyFEiwXO1yr6kTVrWpiSqy","googleMapsApiKey":"AIzaSyBKANcqkf40AUjz5IadW_H5wzijw1ZRkmY","sentryDsn":"https://c30dc69c78434050aed6f64b97cbd645@o244691.ingest.sentry.io/1422222","stripePublicKey":"pk_test_HHvO5elQXBUhbNuZWt0ngNLx","stripePublishableKey":"pk_test_HHvO5elQXBUhbNuZWt0ngNLx","vueAppApiUrl":"https://victortolbert-api.herokuapp.com","app":{"basePath":"/","assetsPath":"/_nuxt/","cdnURL":null}} };
!function(){"use strict";var e=window,s=document,o=s.documentElement,a=["dark","light"],t=window.localStorage.getItem("nuxt-color-mode")||"system",c="system"===t?l():t,i=s.body.getAttribute("data-color-mode-forced");function r(e){var s=""+e+"-mode";o.classList?o.classList.add(s):o.className+=" "+s}function n(s){return e.matchMedia("(prefers-color-scheme"+s+")")}function l(){if(e.matchMedia&&"not all"!==n("").media)for(var s of a)if(n(":"+s).matches)return s;return"light"}i&&(c=i),r(c),e["__NUXT_COLOR_MODE__"]={preference:t,value:c,getColorScheme:l,addClass:r,removeClass:function(e){var s=""+e+"-mode";o.classList?o.classList.remove(s):o.className=o.className.replace(new RegExp(s,"g"),"")}}}();

// Fetch mixin
if (!Vue.__nuxt__fetch__mixin__) {
  Vue.mixin(fetchMixin)
  Vue.__nuxt__fetch__mixin__ = true
}

if (!global.fetch) { global.fetch = fetch }

let root;
export const WRAPS = 'STORYBOOK_WRAPS'
export const framework = 'vue'
export const COMPONENT = 'STORYBOOK_COMPONENT';
export const VALUES = 'STORYBOOK_VALUES';

function prepare (
  rawStory,
  innerStory
) {
  let story

  if (typeof rawStory === 'string') {
    story = { template: rawStory }
  } else if (rawStory != null) {
    story = rawStory
  } else {
    return null
  }

  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  if (!story._isVue) {
    if (innerStory) {
      story.components = { ...(story.components || {}), story: innerStory }
    }
    story = Vue.extend(story)
    // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307984824
  } else if (story.options[WRAPS]) {
    return story
  }

  return Vue.extend({
    // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307985279
    [WRAPS]: story,
    // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307984824
    [VALUES]: { ...(innerStory ? innerStory.options[VALUES] : {}), ...extractProps(story) },
    functional: true,
    render (h, { data, parent, children }) {
      // Suddenly story will render twice and in the first render it isn't descendent of nuxt app
      // Ensure that story will render only inside the nuxt context
      if (!parent.$root.nuxt) return null
      return h(
        story,
        {
          ...data,
          // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307986196
          props: { ...(data.props || {}), ...parent.$root[VALUES] }
        },
        children
      )
    }
  })
}

const defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
  args: {},
  argTypes: {},
  globals: {}
}

export function decorateStory (
  storyFn,
  decorators
) {
  return decorators.reduce(
    (decorated, decorator) => (context = defaultContext) => {
      let story

      const decoratedStory = decorator(
        ({ parameters, ...innerContext } = {}) => {
          story = decorated({ ...context, ...innerContext })
          return story
        },
        context
      )

      if (!story) {
        story = decorated(context)
      }

      if (decoratedStory === story) {
        return story
      }

      return prepare(decoratedStory, story)
    },
    context => prepare(storyFn(context))
  )
}

/**
 * @nuxtjs/storybook
 * Custom render function for stories
 */
export async function render({
  storyFn,
  kind,
  name,
  args,
  showMain,
  showError,
  showException,
  forceRender,
}) {
  if (!root) {
    const app = await getNuxtApp();

    root = new Vue({
      ...app,
      data() {
        return {
          ...app.data(),
          [COMPONENT]: undefined,
          [VALUES]: {},
        };
      },
      render(h) {
        const children = this[COMPONENT] ? [h(this[COMPONENT])] : undefined;
        return h('div', { attrs: { id: 'root' } }, children);
      },
    })
    window.$nuxt = root;
  }
  Vue.config.errorHandler = showException;

  // FIXME: move this into root[COMPONENT] = element
  // once we get rid of knobs so we don't have to re-create
  // a new component each time
  const element = storyFn();

  if (!element) {
    showError({
      title: `Expecting a Vue component from the story: "${name}" of "${kind}".`,
      description: `
        Did you forget to return the Vue component from the story?
        Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `,
    });
    return;
  }

  showMain();

  // at component creation || refresh by HMR or switching stories
  if (!root[COMPONENT] || !forceRender) {
    root[COMPONENT] = element;
  }

  // @ts-ignore https://github.com/storybookjs/storrybook/pull/7578#discussion_r307986139
  root[VALUES] = { ...element.options[VALUES], ...args };

  if (!root.$el) {
    root.$mount('#root');
  }
}

/**
 * use `createApp` to create nuxt context and cache in `__NUXT_APP`
 */
export async function getNuxtApp() {
    if (!window.__NUXT_APP) {
        // Make sure plugin scripts executes before `../index.js` import
        const { app } = await createApp(null, __NUXT__.config)
        window.__NUXT_APP = app;
    }
    return window.__NUXT_APP;
}

// based on: https://github.com/storybookjs/storybook/blob/master/addons/docs/src/frameworks/vue/prepareForInline.ts
export function prepareForInline (storyFn, { args }) {
  const el = React.useRef(null)
  // FIXME: This recreates the Vue instance every time, which should be optimized
  React.useEffect(() => {
    let root
    const __NUXT_APP = getNuxtApp()
    __NUXT_APP.then((app) => {
      const component = storyFn()
      root = new Vue({
        ...app,
        el: el.current,
        data () {
          return {
            [COMPONENT]: component,
            [VALUES]: args
          }
        },
        render (h) {
          const children = this[COMPONENT] ? [h(this[COMPONENT])] : undefined
          return h('div', { attrs: { id: 'root' } }, children)
        }
      })
    })
    return () => root && root.$destroy()
  })

  return React.createElement('div', null, React.createElement('div', { ref: el }))
}