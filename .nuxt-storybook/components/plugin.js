import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  ModalForm: () => import('../../components/ModalForm.vue' /* webpackChunkName: "components/modal-form" */).then(c => wrapFunctional(c.default || c)),
  AppFooter: () => import('../../components/app/Footer.vue' /* webpackChunkName: "components/app-footer" */).then(c => wrapFunctional(c.default || c)),
  AppLanguageSwitcher: () => import('../../components/app/LanguageSwitcher.vue' /* webpackChunkName: "components/app-language-switcher" */).then(c => wrapFunctional(c.default || c)),
  AppNavbar: () => import('../../components/app/Navbar.vue' /* webpackChunkName: "components/app-navbar" */).then(c => wrapFunctional(c.default || c)),
  AppThemeMenu: () => import('../../components/app/ThemeMenu.vue' /* webpackChunkName: "components/app-theme-menu" */).then(c => wrapFunctional(c.default || c)),
  BaseCheckbox: () => import('../../components/base/Checkbox.vue' /* webpackChunkName: "components/base-checkbox" */).then(c => wrapFunctional(c.default || c)),
  BaseDatepicker: () => import('../../components/base/Datepicker.vue' /* webpackChunkName: "components/base-datepicker" */).then(c => wrapFunctional(c.default || c)),
  BaseIconOutlined: () => import('../../components/base/IconOutlined.vue' /* webpackChunkName: "components/base-icon-outlined" */).then(c => wrapFunctional(c.default || c)),
  BaseIconSolid: () => import('../../components/base/IconSolid.vue' /* webpackChunkName: "components/base-icon-solid" */).then(c => wrapFunctional(c.default || c)),
  BaseImage: () => import('../../components/base/Image.vue' /* webpackChunkName: "components/base-image" */).then(c => wrapFunctional(c.default || c)),
  BaseInput: () => import('../../components/base/Input.vue' /* webpackChunkName: "components/base-input" */).then(c => wrapFunctional(c.default || c)),
  BaseLogo: () => import('../../components/base/Logo.vue' /* webpackChunkName: "components/base-logo" */).then(c => wrapFunctional(c.default || c)),
  BaseMenu: () => import('../../components/base/Menu.vue' /* webpackChunkName: "components/base-menu" */).then(c => wrapFunctional(c.default || c)),
  BaseSelect: () => import('../../components/base/Select.vue' /* webpackChunkName: "components/base-select" */).then(c => wrapFunctional(c.default || c)),
  BaseToggleSwitch: () => import('../../components/base/ToggleSwitch.vue' /* webpackChunkName: "components/base-toggle-switch" */).then(c => wrapFunctional(c.default || c)),
  UserSettingsForm: () => import('../../components/user/SettingsForm.vue' /* webpackChunkName: "components/user-settings-form" */).then(c => wrapFunctional(c.default || c)),
  PageBreadcrumb: () => import('../../components/page/Breadcrumb.vue' /* webpackChunkName: "components/page-breadcrumb" */).then(c => wrapFunctional(c.default || c)),
  PageHeader: () => import('../../components/page/Header.vue' /* webpackChunkName: "components/page-header" */).then(c => wrapFunctional(c.default || c)),
  PageHeading: () => import('../../components/page/Heading.vue' /* webpackChunkName: "components/page-heading" */).then(c => wrapFunctional(c.default || c)),
  PageNavbar: () => import('../../components/page/Navbar.vue' /* webpackChunkName: "components/page-navbar" */).then(c => wrapFunctional(c.default || c)),
  PageWrapper: () => import('../../components/page/Wrapper.vue' /* webpackChunkName: "components/page-wrapper" */).then(c => wrapFunctional(c.default || c)),
  SectionWrapper: () => import('../../components/section/Wrapper.vue' /* webpackChunkName: "components/section-wrapper" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
