<template>
  <Layout>
    <PortalTarget name="modals" />
    <SvgSprite />
    <Nuxt keep-alive :key="$route.params.id" />
  </Layout>
</template>
