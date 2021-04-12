<script>
export default {
  data() {
    return {
      activeTab: '0',
      count: 1,
    }
  },
  mounted() {
    setTimeout(() => {
      this.count++
    }, 3 * 1000)
  },
}
</script>

<template>
  <article class="flex-1">
    <PageWrapper>
      <PageHeading> {{ $t('training') }} </PageHeading>
      Training Welcome the GASPS Training Center. From this page you can access
      and register for statewide GASPS trainings, as well as national trainings
      provided by our federal partners at the Center for the Application of
      Prevention Technologies (CAPT). Current and future training events are
      listed on this page. Past trainings are removed and web based trainings
      are archived to the resources page under the “webinar” heading. Click Here
      For All Archived Webinars

      <!-- <PageBreadcrumb class="mt-2" /> -->
      Dates Training Modality CEUs Archived January 26, 2021 10:00-11:00 am
      Shared Risk & Protective Factors-all staff Zoom no no Join Zoom Meeting
      https://us02web.zoom.us/j/88435843854?pwd=TytNU2ZvQXNMcHpaNFdLdk56cHRkQT09
      Meeting ID: 884 3584 3854 Passcode: 421097 --OR-- Dial by your location +1
      929 205 6099 US (New York) Find your local number:
      https://us02web.zoom.us/u/kpWLPEqKk Facilitators: Prospectus Group Dates
      Training Modality CEUs Archived February 16, 2021 10:00 AM - 12:00 PM
      Sustainability Assessment Toolkit-building plan Zoom no no Join Zoom
      Meeting
      https://us02web.zoom.us/j/88435843854?pwd=TytNU2ZvQXNMcHpaNFdLdk56cHRkQT09
      Meeting ID: 884 3584 3854 Passcode: 421097 --OR-- Dial by your location +1
      929 205 6099 US (New York) Find your local number:
      https://us02web.zoom.us/u/kpWLPEqKk Facilitators: Prospectus Group Dates
      Training Modality CEUs Archived March 9-12, 2021 9:00 am-5:00 pm SAPST
      (Providers) Zoom no no Join Zoom Meeting
      https://us02web.zoom.us/j/88435843854?pwd=TytNU2ZvQXNMcHpaNFdLdk56cHRkQT09
      Meeting ID: 884 3584 3854 Passcode: 421097 --OR-- Dial by your location +1
      929 205 6099 US (New York) Find your local number:
      https://us02web.zoom.us/u/kpWLPEqKk Facilitators: Prospectus Group Dates
      Training Modality CEUs Archived March 23, 2021 10:00 am-12:00 pm Ethics
      Zoom no no Join Zoom Meeting
      https://us02web.zoom.us/j/88435843854?pwd=TytNU2ZvQXNMcHpaNFdLdk56cHRkQT09
      Meeting ID: 884 3584 3854 Passcode: 421097 --OR-- Dial by your location +1
      929 205 6099 US (New York) Find your local number:
      https://us02web.zoom.us/u/kpWLPEqKk Facilitators: Prospectus Group Dates
      Training Modality CEUs Archived Early-Mid April, 2021 10:00 am-11:00 am
      Intervening Variables & Contributing Factors - possible later date Zoom no
      no Join Zoom Meeting
      https://us02web.zoom.us/j/88435843854?pwd=TytNU2ZvQXNMcHpaNFdLdk56cHRkQT09
      Meeting ID: 884 3584 3854 Passcode: 421097 --OR-- Dial by your location +1
      929 205 6099 US (New York) Find your local number:
      https://us02web.zoom.us/u/kpWLPEqKk Facilitators: Prospectus Group Dates
      Training Modality CEUs Archived April 22, 2021 10:00 am-2:00 pm
      Sustainability Zoom no no Join Zoom Meeting
      https://us02web.zoom.us/j/88435843854?pwd=TytNU2ZvQXNMcHpaNFdLdk56cHRkQT09
      Meeting ID: 884 3584 3854 Passcode: 421097 --OR-- Dial by your location +1
      929 205 6099 US (New York) Find your local number:
      https://us02web.zoom.us/u/kpWLPEqKk Facilitators: Prospectus Group
      <NuxtChild />
    </PageWrapper>
  </article>
</template>
