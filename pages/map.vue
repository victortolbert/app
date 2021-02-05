<template>
  <main class="flex-1 w-full mx-auto">
    <MyMap />
    <div class="row">
      <article class="card cool">
        <h2>A Good Title</h2>
      </article>
      <article class="card warm">
        <h2>Something Else</h2>
      </article>
    </div>
  </main>
</template>

<script>
import MyMap from '@/components/MyMap'
import {defineComponent, inject} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Welcome',
  components: {
    MyMap,
  },
  setup() {
    const foo = inject('foo', 'The Universe')
    const globals = inject('globals')

    return {
      foo,
      globals,
    }
  },
})
</script>

<style>
.card {
  aspect-ratio: 3 / 2;
  position: relative;
  flex: 1;
  background-size: cover;
  display: flex;
  align-items: flex-end;
}

.card:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    15deg,
    hsl(0deg 0% 0% / 0.75),
    hsl(0deg 0% 0% / 0)
  );
  mix-blend-mode: overlay;
}

.warm {
  background: linear-gradient(241.35deg, #ffd43d 1.98%, #cc2500 100%);
}

.cool {
  background: linear-gradient(241.35deg, #8f5aff 1.98%, #0f1b8d 100%);
}

.row {
  display: flex;
  gap: 16px;
  resize: horizontal;
  overflow: auto;
}

.card h2 {
  position: relative;
  flex: 1;
  color: white;
  font-family: sans-serif;
  margin: 0;
  padding: 21px 24px;
  padding-top: 150px;
}
</style>
