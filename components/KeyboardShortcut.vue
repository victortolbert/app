<script>
export default {
  data() {
    return {
      isHelpActive: false,
      message: '',
      name: 'Name',
      show: false,
    }
  },
  created() {
    window.addEventListener('keydown', this.escapeListener)
  },
  // make sure you remove the listener when the component is no longer visible
  unmounted() {
    window.removeEventListener('keydown', this.escapeListener)
  },
  methods: {
    handleShortkey() {
      this.show = !this.show

      this.$oruga.modal.open('testing')

      console.log('...shortcut', this.show)
    },
    escapeListener(event) {
      if (event.key === 'Escape') this.message = 'Escape has been pressed'
    },
  },
}
</script>

<template>
  <section>
    <button
      v-shortkey.push="['shift', '?']"
      @click="handleShortkey"
      @shortkey="handleShortkey"
      @keyup.shift.?="handleShortkey"
    >
      <span class="shortcut-combo">
        <span class="shortcut">shift</span>
        <span class="shortcut-joiner">+</span>
        <span class="shortcut">?</span>
      </span>
    </button>
  </section>
</template>

<style>
.shortcut-combo {
  display: flex;
  order: 2;
}

.shortcut-pair {
  padding-bottom: 8px;
  margin-bottom: 8px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.shortcut-joiner {
  --text-opacity: 1;
  color: #737f8c;
  color: rgba(
    114.75000000000001,
    127.49999999999999,
    140.24999999999997,
    var(--text-opacity)
  );
  font-size: 13px;
  margin-left: 4px;
  margin-right: 4px;
}

.shortcut {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  border-radius: 3px;
  background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
  box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
    0 1px 2px 1px rgba(30, 35, 90, 0.4);
  color: #8d949e;
  min-width: 18px;
  height: 18px;
  margin: 0 0.25em;
  padding: 0 2px 2px;
}
</style>
