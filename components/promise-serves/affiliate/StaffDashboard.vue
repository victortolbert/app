<template>
  <PageWrapper>
    <SectionWrapper> New Churches Added </SectionWrapper>

    <SectionWrapper>
      New Advocates (Completed advocate training)
    </SectionWrapper>

    <SectionWrapper>
      New Volunteers (Completed Volunteer Orientation)
    </SectionWrapper>
    <SectionWrapper>
      New Families (Same as Awaiting Families, would replace existing)
    </SectionWrapper>
    <SectionWrapper> New / Upcoming Needs </SectionWrapper>
    <SectionWrapper> New / Upcoming Events </SectionWrapper>

    <SectionWrapper :padded="false">
      <PromiseServesVolunteerPageHeader />

      <div
        class="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
      >
        <PromiseServesVolunteerProfile class="mt-8" />
      </div>

      <PromiseServesVolunteerNotes />
    </SectionWrapper>

    <SectionWrapper><CaseNotes /></SectionWrapper>
  </PageWrapper>
</template>
