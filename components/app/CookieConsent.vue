<script>
// https://github.com/apertureless/vue-cookie-law
import * as Cookie from 'tiny-cookie'
const STORAGE_TYPES = {
  local: 'localStorage',
  cookies: 'cookies',
}
export default {
  name: 'CookieConsent',
  props: {
    buttonText: {
      type: String,
      default: 'Got it!',
    },
    buttonDecline: {
      type: Boolean,
      default: false,
    },
    buttonDeclineText: {
      type: String,
      default: 'Decline',
    },
    buttonLink: {
      type: [String, Object],
      required: false,
    },
    buttonLinkText: {
      type: String,
      default: 'More info',
    },
    buttonLinkNewTab: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default:
        'This website uses cookies to ensure you get the best experience on our website.',
    },
    theme: {
      type: String,
      default: 'base',
    },
    /**
     * Cookie Container position
     * bottom, top
     * @type {Object}
     */
    position: {
      type: String,
      default: 'bottom',
    },
    /**
     * Transition name has following possibilities
     * slideFromBottom
     * slideFromTop
     * fade
     * @type {Object}
     */
    transitionName: {
      type: String,
      default: 'slideFromBottom',
    },
    buttonClass: {
      type: String,
      default: 'Cookie__button',
    },
    buttonDeclineClass: {
      type: String,
      default: 'Cookie__button--decline',
    },
    storageName: {
      type: String,
      default: 'cookie:accepted',
    },
    storageType: {
      type: String,
      default: STORAGE_TYPES.local,
    },
    cookieOptions: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      supportsLocalStorage: true,
      isOpen: false,
    }
  },
  computed: {
    containerPosition() {
      return `Cookie--${this.position}`
    },
    cookieTheme() {
      return `Cookie--${this.theme}`
    },
    externalButtonLink() {
      return typeof this.buttonLink === 'string' && this.buttonLink.length
    },
    internalButtonLink() {
      return (
        typeof this.buttonLink === 'object' &&
        this.buttonLink != null &&
        Object.keys(this.buttonLink).length
      )
    },
    target() {
      return this.buttonLinkNewTab ? '_blank' : '_self'
    },
    canUseLocalStorage() {
      return (
        this.storageType === STORAGE_TYPES.local && this.supportsLocalStorage
      )
    },
  },
  created() {
    if (this.storageType === STORAGE_TYPES.local) {
      // Check for availability of localStorage
      try {
        const test = '__vue-cookielaw-check-localStorage'
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(test, test)
          window.localStorage.removeItem(test)
        }
      } catch (e) {
        console.info(
          'Local storage is not supported, falling back to cookie use',
        )
        this.supportsLocalStorage = false
      }
    }
    if (!this.getVisited()) {
      this.isOpen = true
    }
  },
  mounted() {
    if (this.isAccepted()) {
      this.$emit('accept')
    }
  },
  methods: {
    setVisited() {
      if (this.canUseLocalStorage) {
        localStorage.setItem(this.storageName, true)
      } else {
        Cookie.set(this.storageName, true, {
          ...this.cookieOptions,
          expires: '1Y',
        })
      }
    },
    setAccepted() {
      if (this.canUseLocalStorage) {
        localStorage.setItem(this.storageName, true)
      } else {
        Cookie.set(this.storageName, true, {
          ...this.cookieOptions,
          expires: '1Y',
        })
      }
    },
    setDeclined() {
      if (this.canUseLocalStorage) {
        localStorage.setItem(this.storageName, false)
      } else {
        Cookie.set(this.storageName, false, {
          ...this.cookieOptions,
          expires: '1Y',
        })
      }
    },
    getVisited() {
      let visited = false
      if (this.canUseLocalStorage) {
        visited = localStorage.getItem(this.storageName)
      } else {
        visited = Cookie.get(this.storageName)
      }
      if (typeof visited === 'string') {
        visited = JSON.parse(visited)
      }
      return !(visited === null || visited === undefined)
    },
    isAccepted() {
      let accepted = false
      if (this.canUseLocalStorage) {
        accepted = localStorage.getItem(this.storageName)
      } else {
        accepted = Cookie.get(this.storageName)
      }
      if (typeof accepted === 'string') {
        accepted = JSON.parse(accepted)
      }
      return accepted
    },
    accept() {
      this.setVisited()
      this.setAccepted()
      this.isOpen = false
      this.$emit('accept')
    },
    close() {
      this.isOpen = false
      this.$emit('close')
    },
    decline() {
      this.setVisited()
      this.setDeclined()
      this.isOpen = false
      this.$emit('decline')
    },
    revoke() {
      if (this.canUseLocalStorage) {
        localStorage.removeItem(this.storageName)
      } else {
        Cookie.remove(this.storageName)
      }
      this.isOpen = true
      this.$emit('revoke')
    },
    open() {
      if (!this.getVisited()) {
        this.isOpen = true
      }
    },
  },
}
</script>

<template>
  <Transition appear :name="transitionName">
    <div class="Cookie" :class="[containerPosition, cookieTheme]" v-if="isOpen">
      <slot :accept="accept" :close="close" :decline="decline" :open="open">
        <div class="Cookie__content">
          <slot name="message">{{ message }}</slot>
        </div>
        <div class="Cookie__buttons">
          <a
            :target="target"
            :href="buttonLink"
            v-if="externalButtonLink"
            :class="buttonClass"
          >
            {{ buttonLinkText }}
          </a>
          <OButton
            tag="router-link"
            :to="buttonLink"
            v-if="internalButtonLink"
            :class="buttonClass"
          >
            {{ buttonLinkText }}
          </OButton>
          <button
            v-if="buttonDecline"
            :class="buttonDeclineClass"
            @click="decline"
          >
            {{ buttonDeclineText }}
          </button>
          <button :class="buttonClass" @click="accept">{{ buttonText }}</button>
        </div>
      </slot>
    </div>
  </Transition>
</template>

<style>
.Cookie {
  position: fixed;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 9999;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-direction: column;
}
.Cookie > * {
  margin: 0.9375rem 0;
  align-self: center;
}
@media screen and (min-width: 48rem) {
  .Cookie {
    flex-flow: row;
  }
  .Cookie > * {
    margin: 0;
  }
}

.Cookie--top {
  top: 0;
  left: 0;
  right: 0;
}

.Cookie--bottom {
  bottom: 0;
  left: 0;
  right: 0;
}

.Cookie__buttons {
  display: flex;
  flex-direction: column;
}
.Cookie__buttons > * {
  margin: 0.3125rem 0;
}
@media screen and (min-width: 48rem) {
  .Cookie__buttons {
    flex-direction: row;
  }
  .Cookie__buttons > * {
    margin: 0 0.9375rem;
  }
}

.Cookie__button {
  cursor: pointer;
  align-self: center;
  white-space: nowrap;
}

.Cookie__declineButton {
  cursor: pointer;
  align-self: center;
  white-space: nowrap;
}

.Cookie--base {
  background: #f1f1f1;
  color: #232323;
  padding: 1.25em;
}
.Cookie--base .Cookie__button {
  background: theme('colors.primary.500');
  padding: 0.625em 3.125em;
  color: #fff;
  border-radius: theme('borderRadius.full');
  border: 0;
  font-size: 1em;
}
.Cookie--base .Cookie__button:hover {
  background: theme('colors.primary.500');
}
.Cookie--base .Cookie__button--decline {
  background: transparent;
  padding: 0.625em 3.125em;
  color: #727272;
  border-radius: 0;
  border: 0;
  font-size: 1em;
}
.Cookie--base .Cookie__button--decline:hover {
  background: #cbcbcb;
}

.Cookie--base--rounded {
  background: #f1f1f1;
  color: #232323;
  padding: 1.25em;
}
</style>
