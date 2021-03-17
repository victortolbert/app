<script>
export default {
  name: 'PledgeReminderModal',
  props: {
    pledgeId: {
      type: Number,
      default: null,
    },
  },
  data: function () {
    return {
      fields: {},
      errors: null,
      isSubmitting: false,
      showSuccess: false,
      showErrors: false,
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    shouldShowMain() {
      return !this.showSuccess && !this.showErrors
    },
    shouldShowSuccess() {
      return this.showSuccess && !this.showErrors
    },
    shouldShowError() {
      return this.showErrors
    },
  },
  methods: {
    submit() {
      this.isSubmitting = true

      axios
        .post(
          '/v3/pledge/reminder/' + this.pledgeId,
          {},
          {headers: {'Content-Type': 'multipart/form-data'}},
        )
        .then(response => {
          this.fields = {}
          this.errors = {}
          this.showSuccess = true
          this.gaEvent('Parent Dashboard', 'Pledges', 'Sent Reminder Email')

          setTimeout(() => {
            if (this.isModalCurrentlyOpen()) {
              this.closeModal()
            }
          }, 3000)
        })
        .catch(error => {
          this.errors = JSON.parse(error.request.response).errors
          this.showErrors = true
          setTimeout(() => {
            if (this.isModalCurrentlyOpen()) {
              this.closeModal()
            }
          }, 3000)
        })
        .finally(() => {
          this.isSubmitting = false
        })
    },
    isModalCurrentlyOpen(selector) {
      let className = ' modal-is-open '
      let element = document.querySelector('body')
      return (
        (' ' + element.className + ' ')
          .replace(/[\n\t]/g, ' ')
          .indexOf(className) > -1
      )
    },
    removeClass(element, className) {
      element.classList.remove(className)
    },
    closeModal() {
      this.removeClass(document.querySelector('body'), 'modal-is-open')
      this.$parent.close()
    },
  },
}
</script>

<template>
  <form
    :class="{
      'mx-auto max-w-xs rounded-xl overflow-hidden shadow-lg bg-white': true,
      'successEnabled flex justify-center': showSuccess,
    }"
    action=""
    @submit.prevent="submit"
  >
    <div v-if="shouldShowMain" class="modal-card bg-white" style="width: auto">
      <button
        type="button"
        class="modal-close inner-modal-close modal-close-btn-position is-large absolute bg-transparent mb-4"
        aria-label="close"
        @click="closeModal"
      >
        &times;
      </button>
      <p class="text-center text-lg leading-normal mt-12 max-w-xs">
        {{ lang.send_explanation }}
      </p>
      <p class="text-center font-semibold text-lg leading-normal mt-4">
        {{ lang.continue }}
      </p>

      <div class="controls px-6">
        <div class="text-center mt-5 pb-1">
          <div class="max-w-md mx-0 md:mx-auto">
            <div>
              <button
                :disabled="isSubmitting"
                type="submit"
                class="button is-secondary is-rounded inline-block mb-4 w-64 shadow"
              >
                {{ lang.send }}
                <i v-if="isSubmitting" class="fa fa-spinner fa-spin" /></button
              ><br />
              <button
                type="button"
                class="button border-grey-dark text-grey-dark is-rounded inline-block mb-4 w-64 is-outlined shadow"
                @click="closeModal"
              >
                {{ lang.cancel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="shouldShowSuccess"
      class="reminder-sent-success modal-card bg-secondary text-white text-center font-semibold w-64 items-center flex px-4 py-12"
    >
      <img
        src="/v3-assets/dashboard/images/email-icon-white.svg"
        alt="Email Icon"
        class="mb-4"
      />
      {{ lang.success }}
    </div>
    <div
      v-if="shouldShowError"
      class="modal-card bg-white px-4 text-center items-center flex"
      style="width: auto"
    >
      <button
        type="button"
        class="modal-close inner-modal-close modal-close-btn-position is-large absolute bg-transparent"
        aria-label="close"
        @click="closeModal"
      >
        &times;
      </button>

      <p class="text-center text-lg leading-normal mt-12 w-64">
        {{ lang.reminder_error }}
      </p>
      <div class="controls px-6">
        <div class="text-center mt-5 pb-1">
          <div class="max-w-md mx-0 md:mx-auto">
            <button
              type="button"
              class="button is-secondary is-rounded inline-block mb-4 w-64 is-outlined"
              @click="closeModal"
            >
              {{ lang.close }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
div.reminder-sent-success img {
  width: 60px;
  height: 31px;
}
.modal-close-btn-position {
  top: 2%;
  right: 1%;
}
.modal-close::before,
.modal-close::after {
  background-color: black;
}
</style>
