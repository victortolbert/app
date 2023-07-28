<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

definePageMeta({
  title: 'Schedule a claim',
  breadcrumb: 'Schedule a claim',
})

const [parent] = useAutoAnimate()

const showHero = ref(false)
const hasCoverage = ref(false)

const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLarge = breakpoints.smaller('lg')

function onClick() {
  setTimeout(() => {
    hasCoverage.value = true
  }, 1000)
}
</script>

<template>
  <div id="edit-form" class="relative mx-auto w-full p-8">
    <section v-if="showHero" id="hero-section" class="mx-auto w-full max-w-screen-md flex flex-col gap-8 text-center text-xl font-light">
      <div class="text-primary-500 flex flex-col gap-8">
        <h2 class="text-4xl">
          Schedule A Claim
        </h2>
        <p>
          Welcome to <b class="font-semibold">EXEMPLAR</b> - Hancock’s premier scheduling and logistics tool accelerating
          data into business insight
        </p>
        <p>
          <b class="font-semibold">Note:</b> If you do not receive a confirmation email within 2 hours of submission please
          call <b class="font-bold text-black">770-569-1669</b>.
        </p>
      </div>
      <p class="text-black">
        Please note that Hancock partners with insurance carriers and their adjuster
        affiliates only.
      </p>
      <p>
        For questions regarding other service offerings please contact us at 770.569.1669.
      </p>
      <div>
        <p class="warning">
          <b>NOTE: </b>To prevent any issues, we recommend using Chrome as your browser.
        </p>
      </div>
    </section>

    <section id="submit-claim-section" class="mx-auto mt-8 w-full max-w-screen-lg">
      <div>
        <ul class="w-full">
          <li class="mx-auto mb-8">
            <div class="mt-1 w-full flex flex-col gap-2 text-center">
              <label for="postal-code" class="m-2 block"> Please enter your ZIP Code to get started </label>
              <div class="w-full flex flex-col justify-center gap-4 lg:flex-row lg:items-end lg:gap-2">
                <div>
                  <UInput
                    id="postal-code"
                    maxlength="5"
                    autocomplete="off"
                    class="block w-full text-center lg:text-left"
                  />
                </div>
                <UButton :block="smallerThanLarge" :loading="hasCoverage" @click="onClick">
                  Check for Coverage
                </UButton>
              </div>
              <div v-if="hasCoverage">
                We've got you covered!
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="hasCoverage" class="grid mt-4 gap-12 md:grid-cols-2">
        <ul ref="parent" class="flex flex-col gap-4">
          <li>
            <UFormGroup name="claim-number" label="Claim Number">
              <UInput
                id="claim-number"
                autocomplete="off"
                placeholder="Type claim number (letters, numbers and dashes only)"
              />
            </UFormGroup>
          </li>
          <li>
            <UFormGroup name="company" label="Company">
              <UInput
                id="company"
                autocomplete="off"
                placeholder="Type claim number (letters, numbers and dashes only)"
              />
            </UFormGroup>
          </li>
          <li>
            <UFormGroup name="insured-first-name" label="Insured First Name">
              <UInput
                id="insured-first-name"
                autocomplete="off"
              />
            </UFormGroup>
          </li>
          <li>
            <UFormGroup name="insured-last-name" label="Insured Last Name">
              <UInput
                id="insured-last-name"
                autocomplete="off"
              />
            </UFormGroup>
          </li>
          <li>
            <UFormGroup name="insured-primary-phone" label="Insured Phone">
              <UInput
                id="insured-primary-phone"
                autocomplete="off"
              />
            </UFormGroup>
          </li>
        </ul>
        <ul class="flex flex-col gap-4">
          <li>
            <UFormGroup name="street-address" label="Street Address">
              <UInput
                id="street-address"
                autocomplete="off"
              />
            </UFormGroup>
          </li>
          <li>
            <UFormGroup name="street-address-2" label="Suite">
              <UInput
                id="street-address-2"
                autocomplete="off"
              />
            </UFormGroup>
          </li>
          <li>
            <UFormGroup name="city" label="City">
              <UInput
                id="city"
                autocomplete="off"
              />
            </UFormGroup>
          </li>
          <li>
            <UFormGroup name="state" label="State">
              <UInput
                id="state"
                autocomplete="off"
              />
            </UFormGroup>
          </li>
        </ul>
      </div>
    </section>

    <div>
      <section id="service-information-section" class="border-primary-500 mx-auto mt-8 w-full max-w-screen-lg border-t pt-8">
        <h3 class="text-lg font-medium">
          Please indicate the type of service required
        </h3>
        <ul class="grid mt-4 gap-12 md:grid-cols-2">
          <li class="flex flex-col gap-4">
            <div>
              <label for="catastrophic-event" class="block">
                Catastrophic Event
              </label>
              <div class="mt-1">
                <div id="catastrophic-event" class="w-full flex flex-wrap items-center gap-4">
                  <div class="choice-container flex items-center">
                    <div role="checkbox" tabindex="0" class="e-checkbox box-label" /> <span class="choice-text whitespace-nowrap">
                      Yes
                    </span>
                  </div>
                  <div class="choice-container flex items-center">
                    <div role="checkbox" tabindex="0" class="e-checkbox box-label" /> <span class="choice-text whitespace-nowrap">
                      No
                    </span>
                  </div>
                  <div class="choice-container flex items-center">
                    <div role="checkbox" tabindex="0" class="e-checkbox box-label" /> <span class="choice-text whitespace-nowrap">
                      Unknown
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label for="is-reinspect" class="block">Re-inspect</label>
              <div class="mt-1">
                <div id="is-reinspect" class="cb-container flex items-center gap-6">
                  <div class="flex items-center">
                    <div role="checkbox" tabindex="0" class="e-checkbox box-label" /> <span class="choice-text whitespace-nowrap">Yes</span>
                  </div>
                  <div class="flex items-center">
                    <div role="checkbox" tabindex="0" class="e-checkbox box-label" /> <span class="choice-text whitespace-nowrap">No</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section id="adjuster-information-section" class="border-primary-500 mx-auto mt-8 w-full max-w-screen-lg border-t pt-8">
        <h3 class="text-lg font-medium">
          Adjuster Information
        </h3>
        <section class="grid mt-4 gap-12 lg:grid-cols-2">
          <ul class="grid gap-8">
            <li>
              <label for="is-independent-adjuster" class="block"> Is Independent Adjuster </label>
              <div class="mt-1">
                <div id="is-independent-adjuster" class="w-full flex flex-wrap items-center gap-4">
                  <div class="choice-container flex items-center">
                    <div role="checkbox" tabindex="0" class="e-checkbox box-label" /> <span class="choice-text whitespace-nowrap">
                      No
                    </span>
                  </div>
                  <div class="choice-container flex items-center">
                    <div role="checkbox" tabindex="0" class="e-checkbox box-label answered" /> <span class="choice-text whitespace-nowrap">
                      Yes
                    </span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <UFormGroup name="adjuster-first-name" label="Adjuster First Name">
                <UInput
                  id="adjuster-first-name"
                  autocomplete="off"
                />
              </UFormGroup>
            </li>
            <li>
              <UFormGroup name="adjuster-last-name" label="Adjuster Last Name">
                <UInput
                  id="adjuster-last-name"
                  autocomplete="off"
                />
              </UFormGroup>
            </li>
            <li>
              <UFormGroup name="adjuster-email" label="Adjuster Email">
                <UInput
                  id="adjuster-email"
                  autocomplete="off"
                  onpaste="event.preventDefault()"
                />
              </UFormGroup>
            </li>
            <li>
              <UFormGroup name="confirm-email" label="Confirm Email" help="Please ensure the adjuster's email address matches in the email and confirm textboxes.">
                <UInput
                  id="confirm-email"
                  autocomplete="off"
                  onpaste="event.preventDefault()"
                />
              </UFormGroup>
            </li>
            <li>
              <UFormGroup name="adjuster-phone" label="Adjuster Phone">
                <UInput
                  id="adjuster-phone"
                  autocomplete="off"
                  onpaste="event.preventDefault()"
                />
              </UFormGroup>
            </li>
          </ul>
          <div>
            <UFormGroup name="notes" label="Notes">
              <UTextarea
                id="adjuster-phone"
                autocomplete="off"
              />
            </UFormGroup>

            <section class="mt-4">
              <header>
                <h3 class="text-lg font-medium">
                  Billing Information
                </h3>
              </header>

              <div class="mt-4 w-full flex gap-4">
                <div class="w-full">
                  <UFormGroup name="billing_first_name" label="Card Holder First Name">
                    <UInput class="w-full" />
                  </UFormGroup>
                </div>
                <div class="w-full">
                  <UFormGroup name="billing_last_name" label="Card Holder Last Name">
                    <UInput class="w-full" />
                  </UFormGroup>
                </div>
              </div>
              <UFormGroup name="billing_address" label="Street Address">
                <UInput />
              </UFormGroup>
              <UFormGroup name="billing_address2" label="Street Address 2">
                <UInput />
              </UFormGroup>
              <div class="flex gap-4">
                <UFormGroup name="billing_city" label="City">
                  <UInput />
                </UFormGroup>
                <UFormGroup name="billing_state" label="State">
                  <UInput />
                </UFormGroup>
                <UFormGroup name="billing_zip" label="Zip Code">
                  <UInput />
                </UFormGroup>
              </div>
              <UFormGroup name="billing_payment" label="Payment Amount">
                <UInput />
              </UFormGroup>
              <h4>Credit Card</h4>
              <UFormGroup name="billing_cc_number" label="Credit Card Number">
                <UInput />
              </UFormGroup>
              <h4>Card Expiration</h4>
              <div class="flex gap-4">
                <UFormGroup name="billing_cc_month" label="Month">
                  <UInput />
                </UFormGroup>
                <UFormGroup name="billing_cc_year" label="Year">
                  <UInput />
                </UFormGroup>
                <UFormGroup name="billing_cc_ccv" label="CCV">
                  <UInput />
                </UFormGroup>
              </div>
            </section>
          </div>
        </section>

        <div class="mt-8">
          <label for="is-additional-claim" class="block">
            Would you like to create another claim after submitting this one?
          </label>
          <div class="mt-1 flex items-center">
            <div class="e-checkbox box-label" /> <span class="choice-text whitespace-nowrap">Yes</span>
          </div>
        </div>
      </section>
    </div>

    <div v-if="hasCoverage" class="mx-auto my-12 w-full md:max-w-sm">
      <UButton size="xl" class="transition-transform duration-100 active:scale-95">
        Submit
      </UButton>
    </div>
  </div>
</template>
