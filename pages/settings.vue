<template>
  <main class="flex-1">
    <BasePageHeading>{{ $t('settings') }}</BasePageHeading>

    <section class="p-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="px-2 py-6 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav class="space-y-1">
            <!-- Current: "bg-gray-50 text-primary-700 hover:text-primary-700 hover:bg-white", Default: "text-gray-900 hover:text-gray-900 hover:bg-gray-50" -->
            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="identification"
              />
              <span class="truncate">{{ $t('basic_info') }}</span>
            </a>

            <a
              v-if="false"
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-primary-700 bg-gray-50 hover:text-primary-700 hover:bg-white group"
              aria-current="page"
            >
              <!-- Current: "text-primary-500 group-hover:text-primary-500", Default: "text-gray-400 group-hover:text-gray-500" -->
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="user-circle"
              />
              <span class="truncate"> {{ $t('account') }} </span>
            </a>

            <a
              v-if="false"
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="key"
              />
              <span class="truncate"> {{ $t('password') }} </span>
            </a>

            <a
              v-if="false"
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="credit-card"
              />
              <span class="truncate"> {{ $t('plan_and_billing') }} </span>
            </a>

            <a
              v-if="false"
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="user-group"
              />
              <span class="truncate"> {{ $t('team') }} </span>
            </a>

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                name="user-group"
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                fixed
              />

              <span class="truncate"> {{ $t('roles') }} </span>
            </a>

            <a
              v-if="false"
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="view-grid-add"
              />
              <span class="truncate"> {{ $t('integrations') }} </span>
            </a>

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="inbox-in"
              />
              <span class="truncate">{{ $t('assignments') }}</span>
            </a>

            <a
              v-if="false"
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="annotation"
              />
              <span class="truncate">{{ $t('members') }}</span>
            </a>

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="pencil"
              />
              <span class="truncate"> {{ $t('notes') }}</span>
            </a>

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconSolid
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="handshake"
              />
              <span class="truncate"> {{ $t('agreements') }} </span>
            </a>

            <!--
              <a
                href="#"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <BaseIconOutlined
                  class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                  name="annotation"
                />
                <span class="truncate">Staff Roles</span>
              </a>
            -->

            <!--
              <a
                href="#"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <BaseIconOutlined
                  class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                  name="annotation"
                />
                <span class="truncate">Church Roles</span>
              </a>
            -->

            <!--
              <a
                href="#"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <BaseIconOutlined
                  class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                  name="annotation"
                />
                <span class="truncate">Care community Volunteer roles</span>
              </a>
            -->

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="support"
              />
              <span class="truncate">{{ $t('care_communities') }}</span>
            </a>

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconSolid
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="history"
              />
              <span class="truncate"
                >{{ $t('history') }} / {{ $t('timeline') }}</span
              >
            </a>

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="clipboard-list"
              />
              <span class="truncate">{{ $t('contact_log') }}</span>
            </a>

            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="photograph"
              />
              <span class="truncate">{{ $t('family_photo') }}</span>
            </a>
          </nav>
        </aside>

        <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('profile') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('profile_description') }}
                  </p>
                </div>

                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label
                      for="username"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('username') }}
                    </label>

                    <div class="flex mt-1 rounded-md shadow-sm">
                      <span
                        class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md sm:text-sm"
                      >
                        designcoder.net/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autocomplete="username"
                        class="flex-grow block w-full min-w-0 border-gray-300 rounded-none focus:ring-primary-500 focus:border-primary-500 rounded-r-md sm:text-sm"
                      />
                    </div>
                  </div>

                  <div class="col-span-3">
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('about') }}
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      {{ $t('about_description') }}
                    </p>
                  </div>

                  <div class="col-span-3">
                    <label class="block text-sm font-medium text-gray-700">
                      {{ $t('photo') }}
                    </label>
                    <div class="flex items-center mt-1">
                      <span
                        class="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full"
                      >
                        <svg
                          class="w-full h-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                      <button
                        type="button"
                        class="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        {{ $t('change') }}
                      </button>
                    </div>
                  </div>

                  <div class="col-span-3">
                    <label class="block text-sm font-medium text-gray-700">
                      {{ $t('cover_photo') }}
                    </label>
                    <div
                      class="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md"
                    >
                      <div class="space-y-1 text-center">
                        <svg
                          class="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label
                            for="file-upload"
                            class="relative font-medium bg-white rounded-md cursor-pointer text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>{{ $t('upload_a_file') }}</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                            />
                          </label>
                          <p class="pl-1">{{ $t('or_drag_and_drop') }}</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('personal_information') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('personal_information_description') }}
                  </p>
                </div>

                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('first_name') }}
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autocomplete="given-name"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="last_name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('last_name') }}
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autocomplete="family-name"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="email_address"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('email_address') }}
                    </label>
                    <input
                      type="text"
                      name="email_address"
                      id="email_address"
                      autocomplete="email"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="country"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('country') }} / {{ $t('region') }}
                    </label>
                    <select
                      id="country"
                      name="country"
                      autocomplete="country"
                      class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div class="col-span-6">
                    <label
                      for="street_address"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('street_address') }}
                    </label>
                    <input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autocomplete="street-address"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('city') }}
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="state"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('state') }} / {{ $t('province') }}
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="postal_code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('zip_code') }}
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      autocomplete="postal-code"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('notifications') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('notifications_description') }}
                  </p>
                </div>

                <fieldset>
                  <legend class="text-base font-medium text-gray-900">
                    {{ $t('by_email') }}
                  </legend>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">
                          {{ $t('comments') }}
                        </label>
                        <p class="text-gray-500">
                          {{ $t('comments_description') }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label
                            for="candidates"
                            class="font-medium text-gray-700"
                          >
                            {{ $t('candidates') }}
                          </label>
                          <p class="text-gray-500">
                            {{ $t('candidates_description') }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="offers" class="font-medium text-gray-700">
                            {{ $t('offers') }}
                          </label>
                          <p class="text-gray-500">
                            {{ $t('offers_description') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="mt-6">
                  <legend class="text-base font-medium text-gray-900">
                    {{ $t('push_notifications') }}
                  </legend>
                  <p class="text-sm text-gray-500">
                    {{ $t('push_notifications_description') }}
                  </p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input
                        id="push_everything"
                        name="push_notifications"
                        type="radio"
                        class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label for="push_everything" class="ml-3">
                        <span class="block text-sm font-medium text-gray-700">
                          {{ $t('everything') }}
                        </span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="push_email"
                        name="push_notifications"
                        type="radio"
                        class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label for="push_email" class="ml-3">
                        <span class="block text-sm font-medium text-gray-700">
                          {{ $t('same_as_email') }}
                        </span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="push_nothing"
                        name="push_notifications"
                        type="radio"
                        class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label for="push_nothing" class="ml-3">
                        <span class="block text-sm font-medium text-gray-700">
                          {{ $t('no_push_notifications') }}
                        </span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
