<script setup>
</script>

<template>
  <section aria-labelledby="payment_details_heading">
    <form method="POST">
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="bg-white px-4 py-6 dark:bg-gray-800 sm:p-6">
          <div>
            <h2 id="payment_details_heading" class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
              Payment details
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Update your billing information. Please note that updating your location could affect your tax rates.
            </p>
          </div>

          <div class="grid grid-cols-4 mt-6 gap-6">
            <div class="col-span-4 sm:col-span-2">
              <UFormGroup name="first_name" label="First name">
                <UInput
                  id="first_name"
                  name="first_name"
                  autocomplete="cc-given-name"
                />
              </UFormGroup>
            </div>

            <div class="col-span-4 sm:col-span-2">
              <UFormGroup name="last_name" label="Last name">
                <UInput
                  id="last_name"
                  name="last_name"
                  autocomplete="cc-family-name"
                />
              </UFormGroup>
            </div>

            <div class="col-span-4 sm:col-span-2">
              <UFormGroup name="email_address" label="Email address">
                <UInput
                  id="email_address"
                  name="email_address"
                  autocomplete="email"
                />
              </UFormGroup>
            </div>

            <div class="col-span-4 sm:col-span-1">
              <UFormGroup name="expiration_date" label="Expiration date">
                <UInput
                  id="expiration_date"
                  name="expiration_date"
                  autocomplete="cc-exp"
                  placeholder="MM / YY"
                />
              </UFormGroup>
            </div>

            <div class="col-span-4 sm:col-span-1">
              <UFormGroup label="Security Code">
                <UInput
                  id="security_code"
                  type="text"
                  name="security_code"
                  autocomplete="cc-csc"
                />
              </UFormGroup>
            </div>

            <div class="col-span-4 sm:col-span-2">
              <UFormGroup name="country" label="Country / Region">
                <USelect
                  id="country"
                  name="country"
                  autocomplete="country"
                  :options="['United States', 'Canada', 'Mexico']"
                />
              </UFormGroup>
            </div>

            <div class="col-span-4 sm:col-span-2">
              <UFormGroup name="postal_code" label="ZIP / Postal">
                <UInput
                  id="postal_code"
                  name="postal_code"
                  autocomplete="postal-code"
                />
              </UFormGroup>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 text-right dark:bg-gray-900 sm:px-6">
          <UButton type="submit">
            Save
          </UButton>
        </div>
      </div>
    </form>
  </section>
</template>
