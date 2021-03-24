import '@oruga-ui/oruga/dist/oruga-full-vars.css'
import Vue from 'vue'
import Oruga from '@oruga-ui/oruga'

Vue.use(Oruga, {
  iconPack: 'fas',
  iconComponent: 'FontAwesomeIcon',
  // statusIcon: false,
  button: {
    override: true,
    rootClass: 'button',
    variantClass: 'is-'
  },
  autocomplete: {
    override: true,
    rootClass: 'myautocomplete-root',
    menuClass: 'border absolute shadow-lg mt-2 bg-white max-h-72 overflow-auto',
    itemClass:
      'py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    itemHoverClass: 'bg-gray-100',
  },
  checkbox: {
    override: true,
    rootClass: 'radio',
    labelClass: 'ml-1 text-sm font-medium text-gray-700',
    checkClass:
      'focus:ring-primary-500 h-4 w-4 rounded text-primary-600 border-gray-300',
    checkedClass: 'radio-checked',
  },
  radio: {
    override: true,
    rootClass: 'radio',
    labelClass: 'ml-1 text-sm font-medium text-gray-700',
    checkClass:
      'focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300',
    checkedClass: 'radio-checked',
  },
  field: {
    override: true,
    labelClass: 'block text-sm font-medium text-gray-700',
    messageClass: 'mt-1 text-sm text-gray-500',
    variantClassDanger: 'bg-red-500',
    variantDanger: 'bg-red-500',
    variantClass: 'text-',
  },
  input: {
    override: true,
    rootClass: 'relative',
    inputClass:
      'block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
    iconLeftClass:
      'absolute inset-y-0 left-0 pl-3 pointer-events-none text-gray-400',
    iconLeftSpaceClass: 'pl-10',
    iconRightClass:
      'absolute inset-y-0 right-0 pr-3 pointer-events-none text-gray-400',
    iconRightSpaceClass: 'pr-10',
    roundedClass: 'rounded-full',
    // roundedClass: 'rounded',
    variantClass: 'border-',
  },
  // dropdown: {
  //   menuClass: 'dropdown-menu',
  //   itemClass: 'dropdown-item',
  //   itemActiveClass: 'dropdown-item-active',
  // },
  // loading: {
  //   overlayClass: 'loading-background',
  // },
  // icon: {
  //   override: true,
  //   spinClass: 'fa-spin',
  // },
  // switch: {
  //   checkClass: 'switch',
  //   labelClass: 'switch-label',
  // },
})

// display: block;
// width: 100%;
// position: absolute;
// left: 0;
// top: 100%;
// overflow: auto;
// z-index: var(--oruga-autocomplete-menu-zindex,20);
// background-color: var(--oruga-autocomplete-menu-background,#fff);
// border-radius: var(--oruga-autocomplete-menu-border-radius,4px);
// box-shadow: var(--oruga-autocomplete-menu-box-shadow,0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.02));
// padding: var(--oruga-autocomplete-menu-padding,.5rem 0 .5rem 0);
// margin: var(--oruga-autocomplete-menu-margin,0);
// max-height: var(--oruga-autocomplete-menu-max-height,200px);
