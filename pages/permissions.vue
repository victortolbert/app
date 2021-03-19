<script>
// https://css-tricks.com/handling-user-permissions-in-javascript/
import {defineComponent, ref, reactive, toRefs} from '@nuxtjs/composition-api'
import {
  hasPermission,
  actions,
  roles,
  licenses,
  hasLicense,
} from '~/helpers/user-access'

export default defineComponent({
  setup() {
    const accessLevel = ref(roles.EDITOR)
    const state = reactive({
      user: {
        license: 'FREE',
      },
    })

    const setAccessLevel = level => {
      accessLevel.value = level
    }
    const setLicense = license => {
      state.user.license = license
    }

    return {
      hasPermission,
      accessLevel,
      setAccessLevel,
      setLicense,
      hasLicense,
      licenses,
      actions,
      roles,
      ...toRefs(state),
    }
  },
})
</script>

<template>
  <PageWrapper>
    <PageHeading> Permissions Demo </PageHeading>

    <SectionWrapper>
      <nav
        class="flex items-center justify-between w-full p-4 space-x-4 bg-primary-100"
      >
        <div>
          <button
            v-if="hasPermission({accessLevel}, actions.VIEW_FILE)"
            type="button"
          >
            Refresh
          </button>
          <button
            v-if="hasPermission({accessLevel}, actions.MODIFY_FILE)"
            type="button"
          >
            Rename
          </button>
          <button
            v-if="hasPermission({accessLevel}, actions.CREATE_FILE)"
            type="button"
          >
            Duplicate
          </button>
          <button
            v-if="hasPermission({accessLevel}, actions.DELETE_FILE)"
            type="button"
          >
            Delete
          </button>
        </div>
        <!-- <ExportsDropdown :user="license" /> -->
        <form class="whitespace-nowrap">
          <label>
            <input
              type="radio"
              name="role"
              @change="setAccessLevel($event.target.value)"
              :value="roles.ADMIN"
              :checked="accessLevel === roles.ADMIN"
            />
            Administrator
          </label>
          <label>
            <input
              type="radio"
              name="role"
              @change="setAccessLevel($event.target.value)"
              :value="roles.EDITOR"
              :checked="accessLevel === roles.EDITOR"
            />
            Editor
          </label>
          <label>
            <input
              type="radio"
              name="role"
              @change="setAccessLevel($event.target.value)"
              :value="roles.GUEST"
              :checked="accessLevel === roles.GUEST"
            />
            Guest
          </label>
        </form>
      </nav>
    </SectionWrapper>

    <SectionWrapper class=""> </SectionWrapper>

    <SectionWrapper>
      <ul>
        <li v-if="hasLicense(user, {type: 'PDF'}, actions.EXPORT_FILE)">
          <button type="button">PDF</button>
        </li>
        <li v-if="hasLicense(user, {type: 'DOCX'}, actions.EXPORT_FILE)">
          <button type="button">DOCX</button>
        </li>
        <li v-if="hasLicense(user, {type: 'XLSX'}, actions.EXPORT_FILE)">
          <button type="button">XLSX</button>
        </li>
        <li v-if="hasLicense(user, {type: 'PPTX'}, actions.EXPORT_FILE)">
          <button type="button">PPTX</button>
        </li>
      </ul>

      <form>
        <fieldset>
          <legend>Choose your license</legend>

          <label>
            <input
              type="radio"
              name="license"
              @change="setLicense($event.target.value)"
              :value="licenses.FREE"
              :checked="user.license === licenses.FREE"
            />
            Free
          </label>

          <label>
            <input
              type="radio"
              name="license"
              @change="setLicense($event.target.value)"
              :value="licenses.PAID"
              :checked="user.license === licenses.PAID"
            />
            Paid
          </label>
        </fieldset>
      </form>
    </SectionWrapper>
  </PageWrapper>
</template>
