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
    <PageHeading> {{ $t('training') }} </PageHeading>

    <SectionWrapper>
      <div class="space-x-3">
        <BaseTag class="font-bold tracking-wider uppercase">
          {{ $t('new') }}
        </BaseTag>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <OTabs expanded :animated="false" v-model="activeTab">
        <OTabItem>
          <template #header>
            <OIcon icon="information-outline" />
            <span> Issues <BaseTag rounded> 3 </BaseTag> </span>
          </template>
        </OTabItem>

        <OTabItem>
          <template #header>
            <OIcon icon="source-pull" />
            <span>
              Pull Requests <BaseTag rounded> {{ count }} </BaseTag>
            </span>
          </template>
        </OTabItem>

        <OTabItem value="0" label="My Account">
          Lorem ipsum dolor sit amet.
        </OTabItem>

        <OTabItem :value="1" label="Company">
          Lorem <br />
          ipsum <br />
          dolor <br />
          sit <br />
          amet.
        </OTabItem>

        <OTabItem value="2" label="Team Members">
          What light is light, if Silvia be not seen? <br />
          What joy is joy, if Silvia be not by— <br />
          Unless it be to think that she is by <br />
          And feed upon the shadow of perfection? <br />
          Except I be by Silvia in the night, <br />
          There is no music in the nightingale.
        </OTabItem>

        <OTabItem value="3" label="Billing" icon="video" disabled>
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
          congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
          vehicula pulvinar tellus, id sodales felis lobortis eget.
        </OTabItem>
      </OTabs>
    </SectionWrapper>

    <SectionWrapper class="tabs">
      <div>
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option selected>My Account</option>
            <option>Company</option>
            <option>Team Members</option>
            <option>Billing</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav
            class="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            <a
              href="#"
              aria-current="page"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-900 bg-white rounded-l-lg group hover:bg-gray-50 focus:z-10"
            >
              <span>My Account</span>
              <span
                aria-hidden="true"
                class="bg-primary-500 absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
            <a
              href="#"
              aria-current="false"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 group hover:bg-gray-50 focus:z-10"
            >
              <span>Company</span>
              <span
                aria-hidden="true"
                class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
            <a
              href="#"
              aria-current="false"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 group hover:bg-gray-50 focus:z-10"
            >
              <span>Team Members</span>
              <span
                aria-hidden="true"
                class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
            <a
              href="#"
              aria-current="false"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-500 bg-white rounded-r-lg hover:text-gray-700 group hover:bg-gray-50 focus:z-10"
            >
              <span>Billing</span>
              <span
                aria-hidden="true"
                class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
          </nav>
        </div>
      </div>
    </SectionWrapper>
  </article>
</template>
