<template>
  <section aria-labelledby="plan_heading">
    <form action="#" method="POST">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
          <div>
            <h2
              id="plan_heading"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Plan
            </h2>
          </div>

          <fieldset>
            <legend class="sr-only">Pricing plans</legend>
            <ul class="relative -space-y-px bg-white rounded-md">
              <li>
                <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
                <div
                  class="relative flex flex-col p-4 border rounded-tl-md rounded-tr-md md:pl-4 md:pr-6 md:grid md:grid-cols-3"
                >
                  <label class="flex items-center text-sm cursor-pointer">
                    <input
                      name="pricing_plan"
                      type="radio"
                      class="w-4 h-4 border-gray-300 cursor-pointer text-primary-500 focus:ring-gray-900"
                      aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                    />
                    <span class="ml-3 font-medium text-gray-900">Startup</span>
                  </label>
                  <p
                    id="plan-option-pricing-0"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <!-- On: "text-primary-900", Off: "text-gray-900" -->
                    <span class="font-medium">$29 / mo</span>
                    <!-- On: "text-primary-700", Off: "text-gray-500" -->
                    <span>($290 / yr)</span>
                  </p>
                  <!-- On: "text-primary-700", Off: "text-gray-500" -->
                  <p
                    id="plan-option-limit-0"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-right"
                  >
                    Up to 5 active job postings
                  </p>
                </div>
              </li>

              <li>
                <!-- On: "", Off: "" -->
                <div
                  :class="[
                    true
                      ? 'bg-primary-50 border-primary-200 z-10'
                      : 'border-gray-200',
                  ]"
                  class="relative flex flex-col p-4 border md:pl-4 md:pr-6 md:grid md:grid-cols-3"
                >
                  <label class="flex items-center text-sm cursor-pointer">
                    <input
                      name="pricing_plan"
                      type="radio"
                      class="w-4 h-4 border-gray-300 cursor-pointer text-primary-500 focus:ring-primary-500"
                      aria-describedby="plan-option-pricing-1 plan-option-limit-1"
                      checked
                    />
                    <span class="ml-3 font-medium text-gray-900">Business</span>
                  </label>
                  <p
                    id="plan-option-pricing-1"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <!-- On: "text-primary-900", Off: "text-gray-900" -->
                    <span class="font-medium">$99 / mo</span>
                    <!-- On: "text-primary-700", Off: "text-gray-500" -->
                    <span>($990 / yr)</span>
                  </p>
                  <!-- On: "text-primary-700", Off: "text-gray-500" -->
                  <p
                    id="plan-option-limit-1"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-right"
                  >
                    Up to 25 active job postings
                  </p>
                </div>
              </li>

              <li>
                <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
                <div
                  class="relative flex flex-col p-4 border border-gray-200 rounded-bl-md rounded-br-md md:pl-4 md:pr-6 md:grid md:grid-cols-3"
                >
                  <label class="flex items-center text-sm cursor-pointer">
                    <input
                      name="pricing_plan"
                      type="radio"
                      class="w-4 h-4 border-gray-300 cursor-pointer text-primary-500 focus:ring-gray-900"
                      aria-describedby="plan-option-pricing-2 plan-option-limit-2"
                    />
                    <span class="ml-3 font-medium text-gray-900"
                      >Enterprise</span
                    >
                  </label>
                  <p
                    id="plan-option-pricing-2"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <!-- On: "text-primary-900", Off: "text-gray-900" -->
                    <span class="font-medium">$249 / mo</span>
                    <!-- On: "text-primary-700", Off: "text-gray-500" -->
                    <span>($2490 / yr)</span>
                  </p>
                  <!-- On: "text-primary-700", Off: "text-gray-500" -->
                  <p
                    id="plan-option-limit-2"
                    class="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-right"
                  >
                    Unlimited active job postings
                  </p>
                </div>
              </li>
            </ul>
          </fieldset>

          <div class="flex items-center">
            <!-- On: "bg-primary-500", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="true"
              aria-labelledby="toggleLabel"
              class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span class="sr-only">Use setting</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
              ></span>
            </button>
            <span id="toggleLabel" class="ml-3">
              <span class="text-sm font-medium text-gray-900"
                >Annual billing
              </span>
              <span class="text-sm text-gray-500">(Save 10%)</span>
            </span>
          </div>
        </div>
        <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
