<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<!-- @vue-ignore -->
<template>
  <div class="relative ml-3">
    <div>
      <OButton
        id="user-menu"
        aria-haspopup="true"
        inverted
        variant="primary"
        @click="isOpen = !isOpen"
      >
        <slot />
      </OButton>
    </div>

    <Transition
      enter-class="scale-95 opacity-0"
      enter-active-class="transition duration-200 ease-out transform scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-class="scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in transform scale-95 opacity-0"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-show="isOpen"
        class="absolute right-0 z-30 w-56 py-1 mt-2 origin-top-right rounded-md shadow-lg z-1 ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <NuxtLink
          to="/profile/"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {{ $t('my_profile') }}
        </NuxtLink>

        <NuxtLink
          to="/requests/"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {{ $t('my_voluteer_requests') }}
        </NuxtLink>

        <NuxtLink
          to="/requests/"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {{ $t('church_voluteer_requests') }}
        </NuxtLink>

        <button
          data-toggle="modal"
          data-target="#modal-calendar-event-details"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          data-mode="add"
          role="menuitem"
        >
          {{ $t('add_an_event') }}
        </button>

        <button
          data-toggle="modal"
          data-target="#modal-notify"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          target="_blank"
          data-ajaxurl="http://promiseserves.test/dashboard/ajax_make_quick_link"
          data-modalheader="Refer a Family Link"
          role="menuitem"
        >
          {{ $t('refer_a_family_link') }}
        </button>

        <button
          data-toggle="modal"
          data-target="#modal-notify"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          target="_blank"
          data-ajaxurl="http://promiseserves.test/dashboard/ajax_make_quick_link?type=request-cc"
          data-modalheader="Request a Care Community Link"
          role="menuitem"
        >
          {{ $t('request_cc_link') }}
        </button>

        <button
          data-toggle="modal"
          data-target="#modal-notify"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          target="_blank"
          data-ajaxurl="http://promiseserves.test/dashboard/ajax_make_quick_howto?type=request-cc"
          data-modalheader="<h2>FAQ, How-to &amp; Help</h2>"
          data-modalclass="modal-lg"
          role="menuitem"
        >
          {{ $t('support_link_text') }}
        </button>

        <button
          href="#modal-notify"
          data-toggle="modal"
          data-target="#modal-notify"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          data-ajaxurl="http://promiseserves.test/people/ajax_edit_person?f=11"
          data-modalheader="<h2>Add a Person</h2>"
          data-modalclass="modal-lg"
        >
          {{ $t('add_a_person') }}
        </button>

        <form v-if="false" method="POST" action="#">
          <button
            type="submit"
            class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            role="menuitem"
          >
            {{ $t('logout') }}
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>
