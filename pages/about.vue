<template>
  <main class="flex-1">
    <BasePageHeading> {{ $t('about') }} </BasePageHeading>

    <section class="grid grid-cols-3 gap-8 p-8">
      <figure
        class="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1"
      >
        <img class="object-cover" src="/assets/img/me/newspaper_photo.jpeg" />
      </figure>

      <figure
        class="overflow-hidden rounded-lg shadow-lg aspect-w-16 aspect-h-9"
      >
        <img class="object-cover" src="/assets/img/me/classmates.jpeg" />
      </figure>

      <figure
        class="overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1"
      >
        <img class="object-cover" src="/assets/img/me/so_many_screens.jpeg" />
      </figure>
    </section>
  </main>
</template>
