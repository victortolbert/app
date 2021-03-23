<template>
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
              class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-primary-500"
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
        <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
        <div
          class="relative flex flex-col p-4 border border-gray-200 md:pl-4 md:pr-6 md:grid md:grid-cols-3"
        >
          <label class="flex items-center text-sm cursor-pointer">
            <input
              name="pricing_plan"
              type="radio"
              class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-primary-500"
              aria-describedby="plan-option-pricing-1 plan-option-limit-1"
              checked
            />
            <!-- On: "text-primary-900", Off: "text-gray-900" -->
            <span class="ml-3 font-medium">Business</span>
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
              class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-primary-500"
              aria-describedby="plan-option-pricing-2 plan-option-limit-2"
            />
            <span class="ml-3 font-medium text-gray-900">Enterprise</span>
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
</template>
