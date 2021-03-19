<template>
  <header class="px-4 py-2 text-white bg-black">
    <div class="container p-4 mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="font-bold uppercase">
          <a href="/" class="hover:no-underline">Nuxt Basic Blog</a>
        </h1>
        <div class="flex">
          <a
            href="/articles/rss.xml"
            target="_blank"
            class="mx-2 hover:no-underline"
          >
            <BaseIconSolid name="rss" />
          </a>
          <a href="" target="_blank" class="mx-2 hover:no-underline">
            <BaseIconSolid name="twitter" />
          </a>
          <a href="" target="_blank" class="mx-2 hover:no-underline">
            <BaseIconSolid name="github" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
