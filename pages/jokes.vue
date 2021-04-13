<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { Promised } from 'vue-promised'
import { getRandomJoke } from '~/api/jokes'

const delay = (t) => new Promise((r) => setTimeout(r, t))

const texts = {
  loading: 'Fetching the joke...',
  waiting: 'Wait for it...',
  ready: 'Another one?',
}

export default defineComponent({
  components: { Promised },
  data: () => ({
    promise: null,
    state: 'waiting',
  }),
  created() {
    // when the api takes too much time
    this.max = 2000
    this.trySuccess()
  },
  computed: {
    buttonText() {
      return texts[this.state]
    },
  },
  methods: {
    getRandomJoke() {
      this.state = 'loading'
      this.promise = getRandomJoke()
      this.promise.finally(() => {
        this.state = 'waiting'
      })
    },
    trySuccess() {
      this.getRandomJoke()
    },
    tryError() {
      this.state = 'ready'
      this.promise = delay(500).then(() => {
        return Promise.reject(new Error('🔥'))
      })
    },
  },
})
</script>

<template>
  <main class="flex-1">
    <SectionWrapper>
      <p class="buttons">
        <button
          :disabled="state !== 'ready'"
          @click="trySuccess"
          style="margin-bottom: 4px"
        >{{ buttonText }}</button>
        <br />
        <button @click="tryError">Purposely fail</button>
      </p>

      <div style="min-height: 9rem">
        <Promised :promise="promise">
          <template v-slot:pending>
            <div class="loading-spinner" />
          </template>

          <template v-slot="joke">
            <blockquote :key="joke.id">
              <i>{{ joke.setup }}</i>
              <br />
              <br />
              <p class="appear" @animationend="state = 'ready'">{{ joke.punchline }}</p>
            </blockquote>
          </template>

          <template v-slot:rejected="error">
            <div
              slot="rejected"
              slot-scope="error"
              class="message--error"
            >Error: {{ error.message }}</div>
          </template>
        </Promised>

        <Promised :promise="promise" :pending-delay="1000" v-slot:combined="props">
          <pre class="code">
            isPending: {{ props.isPending }}
            isDelayElapsed:{{ props.isDelayElapsed }}
            error:{{ props.error && props.error.message }}
            data: {{ props.data }}
          </pre>
        </Promised>
      </div>
    </SectionWrapper>
  </main>
</template>


<style>
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.appear {
  opacity: 0;
  animation: appear 1s ease-in-out 3s;
  animation-fill-mode: forwards;
}
</style>
