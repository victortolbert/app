<template>
  <div>
    <!-- <PageHeading :page="page" class="p-8 bg-gray-800" /> -->

    <section class="p-8 prose">
      <NuxtContent :document="page" />
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    const page = await $content(params.slug || 'index')
      .fetch()
      .catch(_ => {
        error({statusCode: 404, message: 'Page Not Found'})
      })

    return {page}
  },
  methods: {
    test(hash) {
      if (history.pushState) {
        history.pushState(null, null, hash)
      } else {
        location.hash = '#myhash'
      }
    },
    remove() {
      this.$refs['item-highlight'].classList.add('item-highlight')
    },
  },
}
</script>

<style>
:target {
  -webkit-animation: target-fade 3s 1;
  -moz-animation: target-fade 3s 1;
}

@-webkit-keyframes target-fade {
  0% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}
@-moz-keyframes target-fade {
  0% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

p.item-highlight {
  animation: yellowfade 1s;
}
</style>
