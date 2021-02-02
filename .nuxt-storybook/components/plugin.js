import Vue from 'vue'

const globalComponents = {
  AffiliateItem: () =>
    import(
      '../../components/global/AffiliateItem.vue' /* webpackChunkName: "components/global/AffiliateItem" */
    ).then(c => c.default || c),
  ColorModeToggle: () =>
    import(
      '../../components/global/ColorModeToggle.vue' /* webpackChunkName: "components/global/ColorModeToggle" */
    ).then(c => c.default || c),
  DeveloperToolbar: () =>
    import(
      '../../components/global/DeveloperToolbar.vue' /* webpackChunkName: "components/global/DeveloperToolbar" */
    ).then(c => c.default || c),
  EmailLink: () =>
    import(
      '../../components/global/EmailLink.vue' /* webpackChunkName: "components/global/EmailLink" */
    ).then(c => c.default || c),
  Logo: () =>
    import(
      '../../components/global/Logo.vue' /* webpackChunkName: "components/global/Logo" */
    ).then(c => c.default || c),
  LogoAlgolia: () =>
    import(
      '../../components/global/LogoAlgolia.vue' /* webpackChunkName: "components/global/LogoAlgolia" */
    ).then(c => c.default || c),
  LogoBooster: () =>
    import(
      '../../components/global/LogoBooster.vue' /* webpackChunkName: "components/global/LogoBooster" */
    ).then(c => c.default || c),
  LogoCss3: () =>
    import(
      '../../components/global/LogoCSS3.vue' /* webpackChunkName: "components/global/LogoCSS3" */
    ).then(c => c.default || c),
  LogoCloud: () =>
    import(
      '../../components/global/LogoCloud.vue' /* webpackChunkName: "components/global/LogoCloud" */
    ).then(c => c.default || c),
  LogoCypress: () =>
    import(
      '../../components/global/LogoCypress.vue' /* webpackChunkName: "components/global/LogoCypress" */
    ).then(c => c.default || c),
  LogoFigma: () =>
    import(
      '../../components/global/LogoFigma.vue' /* webpackChunkName: "components/global/LogoFigma" */
    ).then(c => c.default || c),
  LogoGaSps: () =>
    import(
      '../../components/global/LogoGaSps.vue' /* webpackChunkName: "components/global/LogoGaSps" */
    ).then(c => c.default || c),
  LogoHtml5: () =>
    import(
      '../../components/global/LogoHTML5.vue' /* webpackChunkName: "components/global/LogoHTML5" */
    ).then(c => c.default || c),
  LogoJs: () =>
    import(
      '../../components/global/LogoJS.vue' /* webpackChunkName: "components/global/LogoJS" */
    ).then(c => c.default || c),
  LogoJamStack: () =>
    import(
      '../../components/global/LogoJamStack.vue' /* webpackChunkName: "components/global/LogoJamStack" */
    ).then(c => c.default || c),
  LogoLaravel: () =>
    import(
      '../../components/global/LogoLaravel.vue' /* webpackChunkName: "components/global/LogoLaravel" */
    ).then(c => c.default || c),
  LogoMirage: () =>
    import(
      '../../components/global/LogoMirage.vue' /* webpackChunkName: "components/global/LogoMirage" */
    ).then(c => c.default || c),
  LogoNetlify: () =>
    import(
      '../../components/global/LogoNetlify.vue' /* webpackChunkName: "components/global/LogoNetlify" */
    ).then(c => c.default || c),
  LogoNuxt: () =>
    import(
      '../../components/global/LogoNuxt.vue' /* webpackChunkName: "components/global/LogoNuxt" */
    ).then(c => c.default || c),
  LogoSalesLoft: () =>
    import(
      '../../components/global/LogoSalesLoft.vue' /* webpackChunkName: "components/global/LogoSalesLoft" */
    ).then(c => c.default || c),
  LogoSentry: () =>
    import(
      '../../components/global/LogoSentry.vue' /* webpackChunkName: "components/global/LogoSentry" */
    ).then(c => c.default || c),
  LogoSps: () =>
    import(
      '../../components/global/LogoSps.vue' /* webpackChunkName: "components/global/LogoSps" */
    ).then(c => c.default || c),
  LogoStatamic: () =>
    import(
      '../../components/global/LogoStatamic.vue' /* webpackChunkName: "components/global/LogoStatamic" */
    ).then(c => c.default || c),
  LogoStorybook: () =>
    import(
      '../../components/global/LogoStorybook.vue' /* webpackChunkName: "components/global/LogoStorybook" */
    ).then(c => c.default || c),
  LogoSvelte: () =>
    import(
      '../../components/global/LogoSvelte.vue' /* webpackChunkName: "components/global/LogoSvelte" */
    ).then(c => c.default || c),
  LogoTitan: () =>
    import(
      '../../components/global/LogoTitan.vue' /* webpackChunkName: "components/global/LogoTitan" */
    ).then(c => c.default || c),
  LogoTolbertDesign: () =>
    import(
      '../../components/global/LogoTolbertDesign.vue' /* webpackChunkName: "components/global/LogoTolbertDesign" */
    ).then(c => c.default || c),
  LogoVt: () =>
    import(
      '../../components/global/LogoVT.vue' /* webpackChunkName: "components/global/LogoVT" */
    ).then(c => c.default || c),
  LogoVtDark: () =>
    import(
      '../../components/global/LogoVTDark.vue' /* webpackChunkName: "components/global/LogoVTDark" */
    ).then(c => c.default || c),
  LogoVidea: () =>
    import(
      '../../components/global/LogoVidea.vue' /* webpackChunkName: "components/global/LogoVidea" */
    ).then(c => c.default || c),
  LogoZoom: () =>
    import(
      '../../components/global/LogoZoom.vue' /* webpackChunkName: "components/global/LogoZoom" */
    ).then(c => c.default || c),
  PendingPlaceholder: () =>
    import(
      '../../components/global/PendingPlaceholder.vue' /* webpackChunkName: "components/global/PendingPlaceholder" */
    ).then(c => c.default || c),
  SimpleLogoCloud: () =>
    import(
      '../../components/global/SimpleLogoCloud.vue' /* webpackChunkName: "components/global/SimpleLogoCloud" */
    ).then(c => c.default || c),
  SvgIcon: () =>
    import(
      '../../components/global/SvgIcon.vue' /* webpackChunkName: "components/global/SvgIcon" */
    ).then(c => c.default || c),
  SvgSprite: () =>
    import(
      '../../components/global/SvgSprite.vue' /* webpackChunkName: "components/global/SvgSprite" */
    ).then(c => c.default || c),
  BaseAlert: () =>
    import(
      '../../components/global/bases/BaseAlert.vue' /* webpackChunkName: "components/global/bases/BaseAlert" */
    ).then(c => c.default || c),
  BaseList: () =>
    import(
      '../../components/global/bases/BaseList.vue' /* webpackChunkName: "components/global/bases/BaseList" */
    ).then(c => c.default || c),
  CodeBlock: () =>
    import(
      '../../components/global/bases/CodeBlock.vue' /* webpackChunkName: "components/global/bases/CodeBlock" */
    ).then(c => c.default || c),
  CodeGroup: () =>
    import(
      '../../components/global/bases/CodeGroup.vue' /* webpackChunkName: "components/global/bases/CodeGroup" */
    ).then(c => c.default || c),
  CodeSandbox: () =>
    import(
      '../../components/global/bases/CodeSandbox.vue' /* webpackChunkName: "components/global/bases/CodeSandbox" */
    ).then(c => c.default || c),
  ColorSwitcher: () =>
    import(
      '../../components/global/bases/ColorSwitcher.vue' /* webpackChunkName: "components/global/bases/ColorSwitcher" */
    ).then(c => c.default || c),
  ExampleMultiselect: () =>
    import(
      '../../components/global/examples/ExampleMultiselect.vue' /* webpackChunkName: "components/global/examples/ExampleMultiselect" */
    ).then(c => c.default || c),
  IconAlert: () =>
    import(
      '../../components/global/icons/IconAlert.vue' /* webpackChunkName: "components/global/icons/IconAlert" */
    ).then(c => c.default || c),
  IconAngular: () =>
    import(
      '../../components/global/icons/IconAngular.vue' /* webpackChunkName: "components/global/icons/IconAngular" */
    ).then(c => c.default || c),
  IconArrowLeft: () =>
    import(
      '../../components/global/icons/IconArrowLeft.vue' /* webpackChunkName: "components/global/icons/IconArrowLeft" */
    ).then(c => c.default || c),
  IconArrowRight: () =>
    import(
      '../../components/global/icons/IconArrowRight.vue' /* webpackChunkName: "components/global/icons/IconArrowRight" */
    ).then(c => c.default || c),
  IconCheck: () =>
    import(
      '../../components/global/icons/IconCheck.vue' /* webpackChunkName: "components/global/icons/IconCheck" */
    ).then(c => c.default || c),
  IconChevronRight: () =>
    import(
      '../../components/global/icons/IconChevronRight.vue' /* webpackChunkName: "components/global/icons/IconChevronRight" */
    ).then(c => c.default || c),
  IconClose: () =>
    import(
      '../../components/global/icons/IconClose.vue' /* webpackChunkName: "components/global/icons/IconClose" */
    ).then(c => c.default || c),
  IconEma: () =>
    import(
      '../../components/global/icons/IconEma.vue' /* webpackChunkName: "components/global/icons/IconEma" */
    ).then(c => c.default || c),
  IconExternalLink: () =>
    import(
      '../../components/global/icons/IconExternalLink.vue' /* webpackChunkName: "components/global/icons/IconExternalLink" */
    ).then(c => c.default || c),
  IconGithub: () =>
    import(
      '../../components/global/icons/IconGithub.vue' /* webpackChunkName: "components/global/icons/IconGithub" */
    ).then(c => c.default || c),
  IconInfo: () =>
    import(
      '../../components/global/icons/IconInfo.vue' /* webpackChunkName: "components/global/icons/IconInfo" */
    ).then(c => c.default || c),
  IconLogo: () =>
    import(
      '../../components/global/icons/IconLogo.vue' /* webpackChunkName: "components/global/icons/IconLogo" */
    ).then(c => c.default || c),
  IconLogoDark: () =>
    import(
      '../../components/global/icons/IconLogoDark.vue' /* webpackChunkName: "components/global/icons/IconLogoDark" */
    ).then(c => c.default || c),
  IconMenu: () =>
    import(
      '../../components/global/icons/IconMenu.vue' /* webpackChunkName: "components/global/icons/IconMenu" */
    ).then(c => c.default || c),
  IconMoon: () =>
    import(
      '../../components/global/icons/IconMoon.vue' /* webpackChunkName: "components/global/icons/IconMoon" */
    ).then(c => c.default || c),
  IconNuxt: () =>
    import(
      '../../components/global/icons/IconNuxt.vue' /* webpackChunkName: "components/global/icons/IconNuxt" */
    ).then(c => c.default || c),
  IconPromiseServes: () =>
    import(
      '../../components/global/icons/IconPromiseServes.vue' /* webpackChunkName: "components/global/icons/IconPromiseServes" */
    ).then(c => c.default || c),
  IconReact: () =>
    import(
      '../../components/global/icons/IconReact.vue' /* webpackChunkName: "components/global/icons/IconReact" */
    ).then(c => c.default || c),
  IconSearch: () =>
    import(
      '../../components/global/icons/IconSearch.vue' /* webpackChunkName: "components/global/icons/IconSearch" */
    ).then(c => c.default || c),
  IconSun: () =>
    import(
      '../../components/global/icons/IconSun.vue' /* webpackChunkName: "components/global/icons/IconSun" */
    ).then(c => c.default || c),
  IconTitan: () =>
    import(
      '../../components/global/icons/IconTitan.vue' /* webpackChunkName: "components/global/icons/IconTitan" */
    ).then(c => c.default || c),
  IconTolbertDesign: () =>
    import(
      '../../components/global/icons/IconTolbertDesign.vue' /* webpackChunkName: "components/global/icons/IconTolbertDesign" */
    ).then(c => c.default || c),
  IconTranslate: () =>
    import(
      '../../components/global/icons/IconTranslate.vue' /* webpackChunkName: "components/global/icons/IconTranslate" */
    ).then(c => c.default || c),
  IconTwitter: () =>
    import(
      '../../components/global/icons/IconTwitter.vue' /* webpackChunkName: "components/global/icons/IconTwitter" */
    ).then(c => c.default || c),
  IconVue: () =>
    import(
      '../../components/global/icons/IconVue.vue' /* webpackChunkName: "components/global/icons/IconVue" */
    ).then(c => c.default || c),
  IconWebsite: () =>
    import(
      '../../components/global/icons/IconWebsite.vue' /* webpackChunkName: "components/global/icons/IconWebsite" */
    ).then(c => c.default || c),
  IconX: () =>
    import(
      '../../components/global/icons/IconX.vue' /* webpackChunkName: "components/global/icons/IconX" */
    ).then(c => c.default || c),
}

for (const name in globalComponents) {
  Vue.component(name, globalComponents[name])
}
