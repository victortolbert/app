<template>
  <fieldset>
    <legend class="sr-only">Privacy setting</legend>

    <div class="-space-y-px bg-white rounded-md">
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
</template>
