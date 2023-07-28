<script lang="ts" setup>
definePageMeta({
  title: 'Adjuster Profile',
  breadcrumb: 'Adjuster Profile',
})
</script>

<template>
  <UArticle>
    <UContainer>
      Name

      Company

      Email

      Phone

      Billing Information
      <UBox>
        <ExampleProfileBio />
      </UBox>

      <USection>
        <ExamplePaymentDetails />
      </USection>

      <USection>
        <ExamplePlan />
      </USection>

      <NuxtPage />
    </UContainer>
  </UArticle>
</template>
