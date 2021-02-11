<template>
  <div class="payment-form card-body">
    <form
      :novalidate="!isIE11"
      role="form"
      @keydown.enter.prevent
      @submit.prevent="submit"
    >
      <legend class="text-center h4 font-weight-bold">
        {{ $t('student_title') }}
      </legend>

      <TransitionGroup name="slide-fade">
        <div
          v-for="(student, index) in $v.form.students.$each.$iter"
          :key="index"
          class="student"
        >
          <div class="form-group">
            <div
              v-if="student.isDuplicate.$model"
              class="has-error font-weight-bold"
              v-html="$t('no_duplicate_students')"
            />
            <label class="sr-only" for="student_first_name">
              {{ $t('student_first_name') }}
            </label>
            <input
              v-model.trim="student.firstName.$model"
              :placeholder="$t('student_first_name')"
              :class="{
                'is-invalid':
                  student.firstName.$error || student.isDuplicate.$model,
              }"
              :name="`student_first_name[${index}]`"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label class="sr-only" for="student_last_name">
              {{ $t('student_last_name') }}
            </label>
            <input
              v-model.trim="student.lastName.$model"
              :placeholder="$t('student_last_name')"
              :class="{
                'is-invalid':
                  student.lastName.$error || student.isDuplicate.$model,
              }"
              :name="`student_last_name[${index}]`"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="clearfix form-group">
            <select
              v-model.trim="student.classroomId.$model"
              :class="{
                'is-invalid':
                  student.classroomId.$error || student.isDuplicate.$model,
              }"
              :name="`classroomId[${index}]`"
              class="form-control"
              placeholder="$t('classroom')"
              required
            >
              <option :value="null" disabled>{{ $t('classroom') }}</option>
              <option
                v-for="classroom in program.classrooms"
                :key="classroom.id"
                :value="classroom.id"
              >
                {{ classroom.name }}
              </option>
            </select>
            <button
              v-if="index > 0 && index == form.students.length - 1"
              type="button"
              class="float-right btn btn-link"
              @click.prevent="removeStudent"
            >
              {{ $t('student_remove_title') }}
              <i class="far fa-trash" />
            </button>
          </div>
          <hr v-if="index != form.students.length - 1" />
        </div>
      </TransitionGroup>

      <div class="mt-4 mb-5 form-group">
        <button
          class="btn btn-sm btn-primary btn-rounded px-25"
          @click.prevent="addStudent"
        >
          {{ $t('student_add_title') }}
        </button>
      </div>

      <legend class="mb-4 text-center h4 font-weight-bold">
        {{ $t('store_credit_title') }}
      </legend>

      <div class="form-group">
        <div class="btn-group d-flex justify-content-around" role="group">
          <div v-for="(item, index) in preSelectOptions" :key="index">
            <button
              :ref="`button${index}`"
              :value="item.amount"
              :class="{'is-selected': item.isSelected}"
              type="button"
              class="btn btn-circle btn-secondary"
              @click="preSelect(item)"
            >
              ${{ item.amount }}
            </button>
            <p>Per Student</p>
          </div>
        </div>
      </div>

      <div class="mb-5 form-group font-weight-bold">
        <label class="mb-10px">{{ $t('store_credit_amount') }}</label>
        <div class="mb-2 input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">$</div>
          </div>
          <input
            :value="otherAmount"
            :class="[
              {'is-invalid': $v.form.amount.$error && focused === false},
              'py-10px',
            ]"
            :placeholder="$t('store_credit_amount_placeholder')"
            class="text-center form-control form-control-lg is-standard"
            @keypress="isNumber"
            @focus="focused = true && $event.target.select()"
            @blur="focused = false"
            @input="moneyChanged"
          />
        </div>
        <div
          v-if="$v.form.amount.$error && focused === false"
          class="has-error"
        >
          {{ $t('minimum_amount_error') }}
        </div>
      </div>

      <legend class="text-center h4 font-weight-bold">
        {{ $t('payment_information') }}
      </legend>
      <div class="form-group">
        <label class="sr-only">{{ $t('payer_first_name') }}</label>
        <input
          v-model="form.payer.firstName"
          :class="{'is-invalid': $v.form.payer.firstName.$error}"
          type="text"
          class="form-control"
          placeholder="First name"
          required
        />
      </div>
      <div class="form-group">
        <label class="sr-only">{{ $t('payer_last_name') }}</label>
        <input
          v-model="form.payer.lastName"
          :class="{'is-invalid': $v.form.payer.lastName.$error}"
          type="text"
          class="form-control"
          placeholder="Last name"
          required
        />
      </div>
      <div class="form-group">
        <label class="sr-only">{{ $t('payer_email') }}</label>
        <input
          v-model="form.payer.email"
          :class="{'is-invalid': $v.form.payer.email.$error}"
          type="email"
          name="email"
          class="form-control"
          placeholder="Email"
          required
        />
      </div>

      <GivingMarketCreditCardInputs :error="cardError" />

      <Transition name="slide-fade">
        <div
          v-if="$v.form.students.$model[0].first_name"
          class="p-2 mb-4 bg-white rounded"
        >
          <table class="table mb-0 table-sm">
            <tr
              v-for="(student, index) in $v.form.students.$each.$iter"
              :key="index"
            >
              <td class="text-left w-100">{{ student.first_name.$model }}</td>
              <td class="text-right font-weight-light text-nowrap">
                {{ $t('store_credit') }}
              </td>
              <td class="text-right text-nowrap">
                ${{ formatPrice($v.form.amount.$model) }}
              </td>
            </tr>
            <tr v-if="program.sponsor_convenience_fee > 0">
              <td class="text-left font-weight-light w-100" colspan="2">
                {{ $t('online_processing_fee') }}
              </td>
              <td class="text-right text-nowrap">
                ${{ formatPrice(program.sponsor_convenience_fee) }}
              </td>
            </tr>
          </table>
        </div>
      </Transition>

      <Transition name="slide-fade">
        <h4
          v-if="$v.form.students.$model[0].firstName"
          class="text-center font-weight-bold"
        >
          {{ $t('total') }}: $ {{ formatPrice(total) }}
        </h4>
      </Transition>

      <button
        :disabled="payPending"
        class="mb-3 btn btn-rounded btn-primary btn-block"
        dusk="submit-button"
      >
        {{ $t('submit_btn') }}
        <i v-if="payPending" class="fa fa-spinner fa-spin" />
      </button>

      <a
        class="text-inherit"
        data-toggle="modal"
        data-target="#paymentTermsModal"
        href="#"
      >
        <u>{{ $t('terms_title') }}</u>
      </a>
    </form>
  </div>
</template>

<script>
import {required, minValue, email} from 'vuelidate/lib/validators'
import client from 'braintree-web/client'
import hostedFields from 'braintree-web/hosted-fields'

const isIE =
  '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style
const isEdge =
  '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style &&
  !window.navigator.msPointerEnabled

export default {
  props: {
    program: {
      type: Object,
      default: null,
    },
    preSelectAmountOptions: {
      type: Object,
      default: null,
    },
    relationships: {
      type: Array,
      default: null,
    },
    braintreeMerchantId: {
      type: String,
      default: null,
    },
    paymentUrl: {
      type: String,
      default: null,
    },
    receiptUrl: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      hasDuplicateStudents: false,
      testFlat: 'flat_a',
      form: {
        students: [
          {
            firstName: null,
            lastName: null,
            classroomId: null,
            isDuplicate: false,
          },
        ],
        payer: {
          firstName: null,
          lastName: null,
          email: null,
        },
        amount: null,
      },
      otherAmount: null,
      money: {
        masked: false,
      },
      payPending: false,
      cardError: {
        code: '',
        message: '',
        details: {
          invalidFieldKeys: [],
        },
      },
      formInstance: null,
      amountDirty: false,
      focused: false,
      isIE11: isIE && !isEdge,
    }
  },
  computed: {
    total() {
      return (
        this.form.amount * this.form.students.length +
        parseFloat(this.program.sponsor_convenience_fee)
      )
    },
    fullName() {
      return this.form.payer.firstName + ' ' + this.form.payer.lastName
    },
    preSelectOptions() {
      return this.preSelectAmountOptions[this.testFlat]
        .map((option, index) => {
          return {
            isSelected: index === 0,
            amount: parseInt(option),
          }
        })
        .slice(0, 3)
    },
  },
  mounted() {
    // this.isIE11 && setTimeout(() => $(this.$refs.button0).click(), 200)
    this.preSelect(this.preSelectOptions[0])
    this.mountCreditCard()
  },
  validations: {
    form: {
      students: {
        required,
        $each: {
          firstName: {
            required,
          },
          lastName: {
            required,
          },
          classroomId: {
            required,
          },
          isDuplicate: {
            required,
          },
        },
      },
      amount: {
        minValue: minValue(5),
      },
      payer: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        email: {
          required,
          email,
        },
      },
    },
  },
  methods: {
    addStudent() {
      this.form.students.push({
        firstName: null,
        lastName: null,
        classroomId: null,
      })
    },
    removeStudent() {
      this.form.students.pop()
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace('.00', '')
    },
    validateDuplicateStudents() {
      const roomStudents = this.form.students.map(student => {
        return (
          '' +
          student.classroomId +
          student.firstName +
          student.lastName
        ).toLowerCase()
      })
      const roomStudentsSet = new Set(roomStudents)
      this.hasDuplicateStudents = roomStudentsSet.size !== roomStudents.length

      roomStudents.forEach((student, index) => {
        this.form.students[index].isDuplicate = !roomStudentsSet.delete(student)
      })
    },
    submit() {
      this.validateDuplicateStudents()

      this.amountDirty = true
      this.$v.$touch()
      this.$forceUpdate()

      if (this.$v.$invalid || this.hasDuplicateStudents) {
        document.body.scrollTop = 0
      } else {
        this.cardError = {
          code: '',
          message: '',
          details: {
            invalidFieldKeys: [],
          },
        }
        this.validateCreditCard()
      }
    },
    mountCreditCard() {
      client
        .create({
          authorization: this.braintreeMerchantId,
        })
        .then(clientInstance => {
          const options = {
            client: clientInstance,
            styles: {
              input: {
                'font-size': '0.9rem',
                color: '#495057',
              },
            },
            fields: {
              number: {
                selector: '#card-number',
                placeholder: 'Card number',
              },
              cvv: {
                selector: '#cvv',
                placeholder: 'CVV',
              },
              expirationDate: {
                selector: '#expiration-date',
                placeholder: 'Exp. MM/YYYY',
              },
            },
          }

          hostedFields
            .create(options)
            .then(fieldInstance => {
              this.formInstance = fieldInstance
            })
            .catch()
        })
    },
    validateCreditCard() {
      if (this.payPending === false) {
        this.payPending = true
        this.formInstance
          .tokenize({
            cardholderName: this.fullName,
          })
          .then(response => {
            this.submitPayment(response.nonce)
          })
          .catch(error => {
            console.error(error)
            this.cardError = {
              code: error.code || '',
              message: this.$t('errors[error.code]') || '',
              details: error.details || {},
            }
            this.payPending = false
          })
      }
    },
    submitPayment(nonce) {
      this.$axios
        .post(this.paymentUrl, {form: this.form, nonce})
        .then(() => {
          this.cardError = null
          window.location.href = '/receipt/' + this.program.id
        })
        .catch(error => {
          this.cardError = {
            code: error.code || '',
            message:
              this.$t('errors[error.response.data.error]') ||
              this.$t('errors.payment_error'),
            details:
              error.response.data.error.message === 'Gateway Rejected: cvv'
                ? {invalidFieldKeys: ['cvv']}
                : {invalidFieldKeys: ['number', 'expirationDate', 'cvv']},
          }

          this.payPending = false
        })
    },
    isNumber(event) {
      event = event || window.event
      const charCode = event.which ? event.which : event.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault()
      } else {
        return true
      }
    },
    deselectPreSelectOptions() {
      this.preSelectOptions.forEach(option => {
        option.isSelected = false
      })
    },
    preSelect(item) {
      this.deselectPreSelectOptions()
      this.otherAmount = null
      this.$v.form.amount.$model = item.amount
      item.isSelected = true
    },
    moneyChanged(event) {
      this.deselectPreSelectOptions()
      this.otherAmount = event.target.value
      this.$v.form.amount.$model = event.target.value
      if (event >= 1) {
        this.amountDirty = true
      }
    },
  },
}
</script>

<style lang="scss">
.payment-form {
  tr:first-child td {
    border-top: none;
  }
}

.has-error {
  color: red;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
