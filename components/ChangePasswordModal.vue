<template>
  <form
    :class="{
      'change-password-modal bg-grey-lightest pb-2 mx-4 lg:mx-auto shadow-md rounded-xl': true,
      'successEnabled bg-secondary flex max-w-sm justify-center': showSuccess,
    }"
    action=""
    @submit.prevent="submit"
  >
    <div v-if="!showSuccess" class="modal-card" style="width: auto">
      <button
        type="button"
        class="absolute modal-close inner-modal-close modal-close-btn-position is-large"
        aria-label="close"
        @click="closeModal"
      >
        &times;
      </button>

      <span
        class="mt-10 mb-8 text-xl font-semibold leading-normal text-center"
        >{{ $t('change_password') }}</span
      >

      <div class="px-6 controls">
        <BField
          :label="$t('current_password')"
          :message="currentPasswordErrors"
          :type="currentPasswordErrors ? 'is-danger text-sm' : ''"
        >
          <BInput
            v-model="fields.current"
            :placeholder="$t('current_password')"
            type="password"
            class="never-actual-addons"
            required
          />
        </BField>

        <div class="password-requirements">
          <span class="font-semibold"
            >{{ $t('change_pwd_must_contain') }}:</span
          >
          <ul class="mb-5">
            <li>{{ minPasswordText }}</li>
            <li>{{ $t('contains_number_short') }}</li>
            <li>{{ $t('contains_lower_short') }}</li>
            <li>{{ $t('contains_upper_short') }}</li>
            <li>{{ $t('contains_special_character_short') }}</li>
          </ul>
        </div>

        <BField
          :label="$t('new_password')"
          :message="newPasswordErrors"
          :type="newPasswordErrors ? 'is-danger text-sm' : ''"
        >
          <BInput
            v-model="fields.password"
            :placeholder="$t('new_password')"
            type="password"
            class="never-actual-addons"
            required
          />
        </BField>

        <BField
          :label="$t('confirm_new_password')"
          :message="confirmPasswordErrors"
          :type="confirmPasswordErrors ? 'is-danger text-sm' : ''"
        >
          <BInput
            v-model="fields.password_confirmation"
            :placeholder="$t('confirm_new_password')"
            type="password"
            class="never-actual-addons"
            required
          />
        </BField>

        <div class="pb-1 mt-5 text-center">
          <div class="max-w-md mx-0 md:mx-auto">
            <div>
              <button
                :disabled="submitting"
                type="submit"
                class="inline-block w-64 mb-4 shadow button is-secondary is-rounded"
              >
                {{ $t('change_pwd_save') }}
                <i v-if="submitting" class="fa fa-spinner fa-spin" /></button
              ><br />
              <button
                type="button"
                class="inline-block w-64 mb-4 button is-secondary is-rounded is-outlined"
                @click="closeModal"
              >
                {{ $t('change_pwd_cancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showSuccess"
      class="flex items-center w-64 pl-8 pr-8 font-semibold text-center text-white password_changed_success modal-card"
    >
      <img
        src="/v3-assets/dashboard/images/password_lock.svg"
        alt="Password Lock"
        class="mb-1"
      />
      {{ $t('change_pwd_success') }}
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChangePasswordModal',
  data() {
    return {
      fields: {},
      errors: null,
      submitting: false,
      showSuccess: false,
    }
  },
  computed: {
    minPasswordText() {
      return this.$t('min_length_short').replace(
        ':value',
        this.$store.state.minPasswordLength,
      )
    },
    currentPasswordErrors() {
      return this.errors && typeof this.errors.current !== 'undefined'
        ? this.errors.current
        : null
    },
    newPasswordErrors() {
      return this.errors && typeof this.errors.password !== 'undefined'
        ? this.addRequiresPrefixToError(this.errors.password)
        : null
    },
    confirmPasswordErrors() {
      if (
        this.errors &&
        typeof this.errors.password_confirmation !== 'undefined'
      ) {
        return this.addRequiresPrefixToError(this.errors.password_confirmation)
      } else if (
        this.errors &&
        typeof this.errors.password_match_error !== 'undefined'
      ) {
        return this.errors.password_match_error
      } else {
        return null
      }
    },
  },
  methods: {
    submit() {
      this.submitting = true
      const formData = new FormData()

      for (const key in this.fields) {
        formData.append(key, this.fields[key])
      }

      // const changeModalInstance = this

      // axios
      //   .post('/v3/password/change', formData, {
      //     headers: {'Content-Type': 'multipart/form-data'},
      //   })
      //   .then(response => {
      //     this.fields = {}
      //     this.errors = {}
      //     this.showSuccess = true

      //     setTimeout(function () {
      //       if (changeModalInstance.isModalCurrentlyOpen()) {
      //         changeModalInstance.closeModal()
      //       }
      //     }, 3000)
      //   })
      //   .catch(error => {
      //     this.errors = JSON.parse(error.request.response).errors
      //   })
      //   .finally(() => {
      //     this.submitting = false
      //   })
    },
    isModalCurrentlyOpen(selector) {
      const className = ' modal-is-open '
      const element = document.querySelector('body')
      return (' ' + element.className + ' ')
        .replace(/[\n\t]/g, ' ')
        .includes(className)
    },
    getModalCloseButton() {
      return document.querySelector('.modal.is-active > .modal-close')
    },
    removeClass(element, className) {
      element.classList.remove(className)
    },
    closeModal() {
      this.removeClass(document.querySelector('body'), 'modal-is-open')
      this.$parent.close()
    },
    addRequiresPrefixToError(errorArray) {
      return errorArray.map(i => this.$t('requires') + ' ' + i)
    },
  },
}
</script>

<style>
.change-password-modal .help.is-danger {
  color: #ef5753 !important;
}
</style>

<style scoped>
/*Prevent input fields from going off the page due to Bulma's assumptions when error fields pop up*/
.field.has-addons .control.never-actual-addons:not(:last-child) {
  margin-right: 0px;
}
div.password_changed_success {
  padding-top: 22px;
  padding-bottom: 10px;
}
div.password_changed_success img {
  width: 30px;
  height: 40px;
}
.inner-modal-close {
  background-color: transparent;
}
.modal-close-btn-position {
  top: 1%;
  right: 1%;
}
.modal-close::before,
.modal-close::after {
  background-color: black;
}
/* Since fontawesome replaces the i tag with a SVG one, we use the below to control the spinner's display */
button svg {
  display: none;
}
button[disabled='disabled'] svg {
  display: inline-block;
}

/* Target webkit browsers only. Also targeting specific height of 650 as that breakpoint is where the height of this modal gets clipped. */
/* The purpose of this is to enable scrolling under a specific height BUT hide the scrollbar. */
@media screen and (-webkit-min-device-pixel-ratio: 0) and (max-height: 650px) {
  .change-password-modal .modal-card {
    overflow-y: scroll;
  }
  .change-password-modal .modal-card::-webkit-scrollbar {
    width: 0 !important;
  }
  .change-password-modal .modal-close-btn-position {
    position: -webkit-sticky;
    position: sticky;
    left: 89%;
  }
}
/* Target firefox only. The purpose of this is to enable scrolling under a specific height BUT hide the scrollbar. */
@-moz-document url-prefix() {
  @media screen and (max-height: 650px) {
    .change-password-modal .modal-card {
      overflow-y: scroll;
    }
    .change-password-modal .modal-card {
      scrollbar-width: none;
    }
    .change-password-modal .modal-close-btn-position {
      position: -webkit-sticky;
      position: sticky;
      left: 89%;
    }
  }
}
</style>
