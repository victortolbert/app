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
  <!-- Description list -->
  <div class="max-w-5xl px-4 mx-auto mt-6 sm:px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('phone') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">{{ person.phone }}</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('email') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ person.email }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('title') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ person.title }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('team') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">{{}}</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('location') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">San Francisco</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('sits') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">Oasis, 4th floor</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('salary') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">$145,000</dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('birthday') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900">June 8, 1990</dd>
      </div>

      <div class="sm:col-span-2">
        <dt class="text-sm font-medium text-gray-500">
          {{ $t('about') }}
        </dt>
        <dd class="mt-1 text-sm text-gray-900 max-w-prose">
          <p>
            Tincidunt quam neque in cursus viverra orci, dapibus nec tristique.
            Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus
            congue arcu aenean posuere aliquam.
          </p>
          <p class="mt-5">
            Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea
            rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus
            vitae. Scelerisque fermentum, cursus felis dui suspendisse velit
            pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan
            vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.
          </p>
        </dd>
      </div>
    </dl>
  </div>
</template>
