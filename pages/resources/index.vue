<template>
  <article class="flex-1">
    <BasePageHeading> {{ $t('resources') }} </BasePageHeading>
    <section class="p-8">
      <div class="space-x-3">
        <span
          class="rounded font-medium bg-warning-100 text-xs py-0.5 px-2 text-warning-800 inline-flex items-center"
        >
          {{ $t('badge') }}
        </span>
        <span
          class="rounded font-medium bg-danger-100 text-xs py-0.5 px-2 text-danger-800 inline-flex items-center"
        >
          {{ $t('badge') }}
        </span>
        <span
          class="rounded font-medium bg-info-100 text-xs py-0.5 px-2 text-info-800 inline-flex items-center"
        >
          {{ $t('badge') }}
        </span>
        <span
          class="rounded font-medium bg-success-100 text-xs py-0.5 px-2 text-success-800 inline-flex items-center"
        >
          {{ $t('badge') }}
        </span>
      </div>
    </section>
  </article>
</template>
