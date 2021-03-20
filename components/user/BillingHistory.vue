<template>
  <section aria-labelledby="billing_history_heading">
    <div class="pt-6 bg-white shadow sm:rounded-md sm:overflow-hidden">
      <div class="px-4 sm:px-6">
        <h2
          id="billing_history_heading"
          class="text-lg font-medium leading-6 text-gray-900"
        >
          Billing history
        </h2>
      </div>
      <div class="flex flex-col mt-6">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div class="overflow-hidden border-t border-gray-200">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Amount
                    </th>
                    <!--
                            `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                          -->
                    <th
                      scope="col"
                      class="relative px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      <span class="sr-only">View receipt</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" x-max="1">
                  <tr>
                    <td
                      class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                    >
                      1/1/2020
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      Business Plan - Annual Billing
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      CA$109.00
                    </td>
                    <td
                      class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                    >
                      <a
                        href="#"
                        class="text-primary-600 hover:text-primary-900"
                        >View receipt</a
                      >
                    </td>
                  </tr>

                  <tr>
                    <td
                      class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                    >
                      1/1/2019
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      Business Plan - Annual Billing
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      CA$109.00
                    </td>
                    <td
                      class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                    >
                      <a
                        href="#"
                        class="text-primary-600 hover:text-primary-900"
                        >View receipt</a
                      >
                    </td>
                  </tr>

                  <tr>
                    <td
                      class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                    >
                      1/1/2018
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      Business Plan - Annual Billing
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      CA$109.00
                    </td>
                    <td
                      class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                    >
                      <a
                        href="#"
                        class="text-primary-600 hover:text-primary-900"
                        >View receipt</a
                      >
                    </td>
                  </tr>

                  <tr>
                    <td
                      class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                    >
                      1/1/2017
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      Business Plan - Annual Billing
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      CA$109.00
                    </td>
                    <td
                      class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                    >
                      <a
                        href="#"
                        class="text-primary-600 hover:text-primary-900"
                        >View receipt</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
