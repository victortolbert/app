<template>
  <PageWrapper class="bg-gray-100">
    <BaseHero
      class="h-72"
      bg-cover
      :cover-url="`${$config.assetsURL}/img/backgrounds/liquid_cheese.svg`"
    />

    <!-- <BaseCard /> -->

    <SectionWrapper class="max-w-6xl">
      <details class="disclosure">
        <summary>Details</summary>
        <div class="p-4 bg-primary-50">
          Something small enough to escape casual notice.
        </div>
      </details>

      <div class="mt-2">
        <PaymentDetailsForm />
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <PromiseServesVolunteerEditButton />
    </SectionWrapper>

    <PromiseServesAdvocateDashboard />
    <!-- <PromiseServesAffiliateStaffDashboard /> -->
    <!-- <PromiseServesAffiliateDashboard /> -->
  </PageWrapper>
</template>
