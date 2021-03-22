<template>
  <article class="max-w-lg px-4 pt-10 pb-12 mx-auto lg:pb-16">
    <form>
      <div class="space-y-6">
        <div>
          <h1 class="text-lg font-medium leading-6 text-gray-900">
            Project Settings
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Let’s get started by filling in the information below to create your
            new project.
          </p>
        </div>

        <div>
          <label
            for="project_name"
            class="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <div class="mt-1">
            <input
              type="text"
              name="project_name"
              id="project_name"
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value="Project Nero"
            />
          </div>
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div class="mt-1">
            <textarea
              id="description"
              name="description"
              rows="3"
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        <div class="space-y-2">
          <div class="space-y-1">
            <label
              for="add_team_members"
              class="block text-sm font-medium text-gray-700"
            >
              Add Team Members
            </label>
            <p id="add_team_members_helper" class="sr-only">
              Search by email address
            </p>
            <div class="flex">
              <div class="flex-grow">
                <input
                  type="text"
                  name="add_team_members"
                  id="add_team_members"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Email address"
                  aria-describedby="add_team_members_helper"
                />
              </div>
              <span class="ml-3">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <!-- Heroicon name: solid/plus -->
                  <svg
                    class="w-5 h-5 mr-1 -ml-2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Add</span>
                </button>
              </span>
            </div>
          </div>

          <div class="border-b border-gray-200">
            <ul class="divide-y divide-gray-200">
              <li class="flex py-4">
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <div class="flex flex-col ml-3">
                  <span class="text-sm font-medium text-gray-900"
                    >Calvin Hawkins</span
                  >
                  <span class="text-sm text-gray-500"
                    >calvin.hawkins@example.com</span
                  >
                </div>
              </li>

              <li class="flex py-4">
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <div class="flex flex-col ml-3">
                  <span class="text-sm font-medium text-gray-900"
                    >Bessie Richards</span
                  >
                  <span class="text-sm text-gray-500"
                    >bessie.richards@example.com</span
                  >
                </div>
              </li>

              <li class="flex py-4">
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <div class="flex flex-col ml-3">
                  <span class="text-sm font-medium text-gray-900"
                    >Floyd Black</span
                  >
                  <span class="text-sm text-gray-500"
                    >floyd.black@example.com</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>

        <fieldset>
          <legend class="text-sm font-medium text-gray-900">Privacy</legend>

          <div class="mt-1 -space-y-px bg-white rounded-md shadow-sm">
            <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
            <div class="relative flex p-4 border rounded-tl-md rounded-tr-md">
              <div class="flex items-center h-5">
                <input
                  id="settings-option-0"
                  name="privacy_setting"
                  type="radio"
                  class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-primary-500"
                  checked
                />
              </div>
              <label
                for="settings-option-0"
                class="flex flex-col ml-3 cursor-pointer"
              >
                <!-- On: "text-primary-900", Off: "text-gray-900" -->
                <span class="block text-sm font-medium"> Public access </span>
                <!-- On: "text-primary-700", Off: "text-gray-500" -->
                <span class="block text-sm">
                  This project would be available to anyone who has the link
                </span>
              </label>
            </div>

            <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
            <div class="relative flex p-4 border border-gray-200">
              <div class="flex items-center h-5">
                <input
                  id="settings-option-1"
                  name="privacy_setting"
                  type="radio"
                  class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-primary-500"
                />
              </div>
              <label
                for="settings-option-1"
                class="flex flex-col ml-3 cursor-pointer"
              >
                <!-- On: "text-primary-900", Off: "text-gray-900" -->
                <span class="block text-sm font-medium">
                  Private to Project Members
                </span>
                <!-- On: "text-primary-700", Off: "text-gray-500" -->
                <span class="block text-sm">
                  Only members of this project would be able to access
                </span>
              </label>
            </div>

            <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
            <div
              class="relative flex p-4 border border-gray-200 rounded-bl-md rounded-br-md"
            >
              <div class="flex items-center h-5">
                <input
                  id="settings-option-2"
                  name="privacy_setting"
                  type="radio"
                  class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-primary-500"
                />
              </div>
              <label
                for="settings-option-2"
                class="flex flex-col ml-3 cursor-pointer"
              >
                <!-- On: "text-primary-900", Off: "text-gray-900" -->
                <span class="block text-sm font-medium"> Private to you </span>
                <!-- On: "text-primary-700", Off: "text-gray-500" -->
                <span class="block text-sm">
                  You are the only one able to access this project
                </span>
              </label>
            </div>
          </div>
        </fieldset>

        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Create this project
          </button>
        </div>
      </div>
    </form>
  </article>
</template>
