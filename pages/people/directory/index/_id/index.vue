<script>
export default {
  props: {
    person: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
<template>
  <div class="max-w-5xl px-4 mx-auto mt-6 sm:px-6 lg:px-8">
    <!-- <p>by Person with id {{ person.id }}</p> -->
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Title</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ person.title }}</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Email</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ person.email }}</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Phone</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ person.phone }}</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Team</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ person.team }}</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Location</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ person.location }}</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Birthday</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ person.birthday }}</dd>
      </div>

      <div class="sm:col-span-2">
        <dt class="text-sm font-medium text-gray-500">Bio</dt>
        <dd class="mt-1 text-sm text-gray-900 max-w-prose">
          <p>{{ person.bio }}</p>
        </dd>
      </div>
    </dl>
  </div>
</template>
