<template>
  <OButton
    href="https://yahoo.com"
    inverted
    icon-right="github"
    icon-pack="fab"
    tag="a"
  >
    <span class="text-sm font-semibold tracking-wider uppercase"
      ><slot>{{ $t('github_sign_in') }}</slot></span
    >
  </OButton>
</template>
