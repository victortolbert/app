<template>
  <section class="grid gap-1 lg:gap-8 lg:grid-cols-2">
    <section class="p-8 bg-white shadow lg:rounded-lg">
      <column-chart />
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <line-chart />
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <bar-chart />
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <pie-chart
        :data="[
          ['Blueberry', 44],
          ['Strawberry', 23],
        ]"
      />
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <bar-chart
        :data="[
          ['X-Small', 5],
          ['Small', 27],
        ]"
      />
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <area-chart />
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <area-chart
        :data="{
          '2017-01-01 00:00:00 -0800': 2,
          '2017-01-01 00:01:00 -0800': 5,
        }"
      />
    </section>
  </section>
</template>
