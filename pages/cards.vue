<template lang="pug">
.p-10.min-h-screen.flex.items-center.bg-indigo-500
  .flex-1.max-w-lg.mx-auto
    .bg-white.rounded-lg.shadow-2xl
      ul.divide-y-2.divide-gray-400
        li.p-6.space-y-2
          .h-3.w-48.bg-gray-300.rounded
          .h-3.w-24.bg-gray-500.rounded
        li.p-6.space-y-2
          .h-3.w-64.bg-gray-300.rounded
          .h-3.w-16.bg-gray-500.rounded
        li.p-6.space-y-2
          .h-3.w-48.bg-gray-300.rounded
          .h-3.w-20.bg-gray-500.rounded
        li.p-6.space-y-2
          .h-3.w-40.bg-gray-300.rounded
          .h-3.w-16.bg-gray-500.rounded

    .bg-white.rounded-lg.shadow-2xl
      ul.flex.flex-row-reverse.divide-x-4.divide-gray-400.divide-dashed.divide-x-reverse
        li.p-6.flex-1.space-y-2
          .h-3.bg-gray-300.rounded
          .h-3.bg-gray-500.rounded(class='w-1/2')
        li.p-6.flex-1.space-y-2
          .h-3.bg-gray-300.rounded
          .h-3.bg-gray-500.rounded(class='w-1/2')
        li.p-6.flex-1.space-y-2
          .h-3.bg-gray-300.rounded
          .h-3.bg-gray-500.rounded(class='w-1/2')

</template>
