<template>
  <section
    class="flex flex-col items-center justify-center flex-1 min-h-screen bg-gray-100"
  >
    <div class="grid gap-8 px-8 lg:grid-cols-1">
      <TrainingStepProgress />

      <!--  3u_vIdnJYLc
            CruddyByDesign: MF0jFKvS4SI
      -->
      <figure class="aspect-w-16 aspect-h-9">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/?controls=0&amp;start=30"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </figure>

      <!-- DateRangeButtonGroup -->
      <span class="relative z-0 inline-flex rounded-md shadow-sm">
        <button
          type="button"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Years
        </button>
        <button
          type="button"
          class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Months
        </button>
        <button
          type="button"
          class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Days
        </button>
      </span>

      <details>
        <summary>
          I have keys but no doors. I have space but no room. You can enter but
          can’t leave. What am I?
        </summary>
        A keyboard.
      </details>
    </div>
  </section>
</template>

<script>
export default {
  // layout: 'plain',
}
</script>
