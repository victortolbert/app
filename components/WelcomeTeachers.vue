<template>
  <div>
    <div v-if="!error">
      <h1 class="mt-8 mb-15 text-29 fw-500">Enter Teacher Code</h1>
      <div class="mx-auto registration-form-constraint d-block">
        <p class="text-14 lh-22 fw-200">
          Haven't received your Teacher Code yet? Ask your Booster
          representative!
        </p>
        <p class="text-invalid text-11">{{ teacher_code_response }}</p>
        <input
          v-model="$parent.teacher_registration_code"
          name="teacher_registration_code"
          class="form-control mb-28px"
          type="text"
          placeholder="Enter Code"
        />
        <input
          id="agree"
          v-model="$parent.agrees_terms"
          name="agree"
          class="checkbox"
          type="checkbox"
          value="agree"
        />
        <label class="text-12 mb-28px" for="agree">
          {{ $t('participant_registration.participation_terms_prefix') }}
          <a id="print-terms" href="/v3/terms" target="_blank">
            {{ $t('participant_registration.participation_terms_link') }}
          </a>
        </label>
        <button
          :disabled="!$parent.agrees_terms || submitting"
          class="mx-auto mb-3 btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18"
          type="submit"
          @click="validateTeacherCode"
        >
          Next
          <i v-if="submitting" class="fa fa-spinner fa-spin" />
        </button>
        <a
          href="#"
          class="mx-auto mb-3 btn btn-navy btn-round d-block w-200px btn-drop-shadow text-18"
          @click="cancel"
        >
          {{ $t('cancel') }}
        </a>
      </div>
    </div>
    <div v-if="error">
      <div class="p-4 lead">
        {{ error }}
      </div>
      <a
        href="/v3/home/dashboard"
        class="mx-auto mb-3 btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18"
      >
        {{ $t('back_to_dashboard') }}
      </a>
      <a
        href="#"
        class="mx-auto mb-3 btn btn-navy btn-round d-block w-200px btn-drop-shadow text-18"
        @click="error = null"
      >
        {{ $t('retry_teacher_code') }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loginURL: {
      type: String,
      default: '',
    },
    cancelLink: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      teacherCodeResponse: null,
      submitting: false,
      error: null,
    }
  },
  mounted() {
    this.hjTrigger('dash-welcome-teacher')
  },
  methods: {
    validateTeacherCode() {
      this.hjTag('Teacher Registration')
      this.submitting = true
      this.$axios
        .get(
          '/v3/api/registration/validateTeacherCode/' +
            this.$parent.teacherRegistrationCode,
        )
        .then(response => {
          this.submitting = false
          if (response) {
            if (response.data.success) {
              // $('input[name="teacher_registration_code"]').removeClass(
              //   'is-invalid',
              // )
              this.gaEvent(
                'Titan Registration',
                'Teacher Registration',
                'Completed',
              )
              this.$emit('teacher-registered')
            } else {
              this.teacherCodeResponse = response.data.message
              // $('input[name="teacher_registration_code"]').addClass(
              //   'is-invalid',
              // )
            }
          }
        })
        .catch(e => {
          this.submitting = false
          if (e.response && e.response.data && e.response.data.error) {
            this.error = e.response.data.error
          }
        })
    },
    cancel() {
      window.location.href = this.cancelLink
    },
  },
}
</script>

<style scoped>
.checkbox {
  margin-right: 6px;
  display: inline;
}
.checkbox-label {
  display: inline;
  padding: 0px;
}
</style>
