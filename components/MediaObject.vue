<template>
  <div class="mt-8 sm:flex">
    <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
      <slot>
        <svg
          class="w-16 h-16 text-gray-300 bg-white border border-gray-300"
          preserveAspectRatio="none"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <path
            vector-effect="non-scaling-stroke"
            stroke-width="1"
            d="M0 0l200 200M0 200L200 0"
          />
        </svg>
      </slot>
    </div>

    <div>
      <h4 class="text-lg font-bold">Lorem ipsum</h4>
      <p class="mt-1">
        Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam
        expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.
      </p>
    </div>
  </div>
</template>
