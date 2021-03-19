<template>
  <section>
    <transition-group tag="div" name="slide" id="puzzle">
      <div
        class="tile"
        v-for="(tile, i) in tiles"
        :key="tile"
        @click="move(i)"
        :class="{empty: tile === '9'}"
      >
        {{ tile }}
      </div>
    </transition-group>
  </section>
</template>

<script>
import {shuffle, isEqual} from 'lodash'

export default {
  data() {
    return {
      tiles: shuffle('123456789'.split('')),
      solution: '123456789'.split(''),
      moves: [
        [1, 3],
        [0, 2, 4],
        [1, 5],
        [0, 4, 6],
        [1, 3, 5, 7],
        [2, 4, 8],
        [3, 7],
        [4, 6, 8],
        [5, 7],
      ],
    }
  },
  watch: {
    solved(newVal, oldVal) {
      alert('Solved.')
    },
  },
  computed: {
    empty() {
      return this.tiles.findIndex(tile => tile === '9')
    },
    solved() {
      return isEqual(this.tiles, this.solution)
    },
  },
  methods: {
    move(i) {
      if (this.moves[i].includes(this.empty)) {
        let tileIndex = i
        let tile = this.tiles[i]
        let emptyIndex = this.empty

        this.$set(this.tiles, tileIndex, this.tiles[emptyIndex])
        this.$set(this.tiles, emptyIndex, tile)
      }
    },
  },
}
</script>

<style>
html,
body,
section {
  height: 100%;
  width: 100%;
}

body {
  background: whitesmoke;
}

section {
  align-items: center;
  display: flex;
  justify-content: center;
}

#puzzle {
  background: #ccc;
  border: 5px solid black;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 240px;
  width: 240px;
}

.tile {
  align-items: center;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  justify-content: center;
}

.tile.empty {
  opacity: 0;
  pointer-events: none;
}

.slide-move {
  transition: transform 0.5s ease;
}
</style>
