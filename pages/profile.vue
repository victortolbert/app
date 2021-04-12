<!-- @vue-ignore-->
<template>
  <PageWrapper>
    <!-- <BaseHero
      :title="$t('profile')"
      cover-url="https://cominex.net/assets/img/backgrounds/liquid_cheese.svg"
      bg-cover
    /> -->
    <ProfileHeader :person="$auth.user" />
    <ProfileDetails :person="$auth.user" />
  </PageWrapper>
</template>
