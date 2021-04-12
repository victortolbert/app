import { wrapFunctional } from './utils'

export { default as ModalForm } from '../../components/ModalForm.vue'
export { default as AppFooter } from '../../components/app/Footer.vue'
export { default as AppLanguageSwitcher } from '../../components/app/LanguageSwitcher.vue'
export { default as AppNavbar } from '../../components/app/Navbar.vue'
export { default as AppThemeMenu } from '../../components/app/ThemeMenu.vue'
export { default as BaseCheckbox } from '../../components/base/Checkbox.vue'
export { default as BaseDatepicker } from '../../components/base/Datepicker.vue'
export { default as BaseIconOutlined } from '../../components/base/IconOutlined.vue'
export { default as BaseIconSolid } from '../../components/base/IconSolid.vue'
export { default as BaseImage } from '../../components/base/Image.vue'
export { default as BaseInput } from '../../components/base/Input.vue'
export { default as BaseLogo } from '../../components/base/Logo.vue'
export { default as BaseMenu } from '../../components/base/Menu.vue'
export { default as BaseSelect } from '../../components/base/Select.vue'
export { default as BaseToggleSwitch } from '../../components/base/ToggleSwitch.vue'
export { default as UserSettingsForm } from '../../components/user/SettingsForm.vue'
export { default as PageBreadcrumb } from '../../components/page/Breadcrumb.vue'
export { default as PageHeader } from '../../components/page/Header.vue'
export { default as PageHeading } from '../../components/page/Heading.vue'
export { default as PageNavbar } from '../../components/page/Navbar.vue'
export { default as PageWrapper } from '../../components/page/Wrapper.vue'
export { default as SectionWrapper } from '../../components/section/Wrapper.vue'

export const LazyModalForm = import('../../components/ModalForm.vue' /* webpackChunkName: "components/modal-form" */).then(c => wrapFunctional(c.default || c))
export const LazyAppFooter = import('../../components/app/Footer.vue' /* webpackChunkName: "components/app-footer" */).then(c => wrapFunctional(c.default || c))
export const LazyAppLanguageSwitcher = import('../../components/app/LanguageSwitcher.vue' /* webpackChunkName: "components/app-language-switcher" */).then(c => wrapFunctional(c.default || c))
export const LazyAppNavbar = import('../../components/app/Navbar.vue' /* webpackChunkName: "components/app-navbar" */).then(c => wrapFunctional(c.default || c))
export const LazyAppThemeMenu = import('../../components/app/ThemeMenu.vue' /* webpackChunkName: "components/app-theme-menu" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseCheckbox = import('../../components/base/Checkbox.vue' /* webpackChunkName: "components/base-checkbox" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseDatepicker = import('../../components/base/Datepicker.vue' /* webpackChunkName: "components/base-datepicker" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseIconOutlined = import('../../components/base/IconOutlined.vue' /* webpackChunkName: "components/base-icon-outlined" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseIconSolid = import('../../components/base/IconSolid.vue' /* webpackChunkName: "components/base-icon-solid" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseImage = import('../../components/base/Image.vue' /* webpackChunkName: "components/base-image" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseInput = import('../../components/base/Input.vue' /* webpackChunkName: "components/base-input" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseLogo = import('../../components/base/Logo.vue' /* webpackChunkName: "components/base-logo" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseMenu = import('../../components/base/Menu.vue' /* webpackChunkName: "components/base-menu" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseSelect = import('../../components/base/Select.vue' /* webpackChunkName: "components/base-select" */).then(c => wrapFunctional(c.default || c))
export const LazyBaseToggleSwitch = import('../../components/base/ToggleSwitch.vue' /* webpackChunkName: "components/base-toggle-switch" */).then(c => wrapFunctional(c.default || c))
export const LazyUserSettingsForm = import('../../components/user/SettingsForm.vue' /* webpackChunkName: "components/user-settings-form" */).then(c => wrapFunctional(c.default || c))
export const LazyPageBreadcrumb = import('../../components/page/Breadcrumb.vue' /* webpackChunkName: "components/page-breadcrumb" */).then(c => wrapFunctional(c.default || c))
export const LazyPageHeader = import('../../components/page/Header.vue' /* webpackChunkName: "components/page-header" */).then(c => wrapFunctional(c.default || c))
export const LazyPageHeading = import('../../components/page/Heading.vue' /* webpackChunkName: "components/page-heading" */).then(c => wrapFunctional(c.default || c))
export const LazyPageNavbar = import('../../components/page/Navbar.vue' /* webpackChunkName: "components/page-navbar" */).then(c => wrapFunctional(c.default || c))
export const LazyPageWrapper = import('../../components/page/Wrapper.vue' /* webpackChunkName: "components/page-wrapper" */).then(c => wrapFunctional(c.default || c))
export const LazySectionWrapper = import('../../components/section/Wrapper.vue' /* webpackChunkName: "components/section-wrapper" */).then(c => wrapFunctional(c.default || c))
