<script>
export default {
  asyncData() {
    return {content: 'Created at: ' + new Date()}
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>

<template>
  <PageWrapper>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>

    <SectionWrapper>
      <div class="font-render-conten">
        <div class="glyphs-content__char">A</div>
        <div class="glyphs-content__char">B</div>
        <div class="glyphs-content__char">C</div>
        <div class="glyphs-content__char">Č</div>
        <div class="glyphs-content__char">Ć</div>
        <div class="glyphs-content__char">D</div>
        <div class="glyphs-content__char">Đ</div>
        <div class="glyphs-content__char">E</div>
        <div class="glyphs-content__char">F</div>
        <div class="glyphs-content__char">G</div>
        <div class="glyphs-content__char">H</div>
        <div class="glyphs-content__char">I</div>
        <div class="glyphs-content__char">J</div>
        <div class="glyphs-content__char">K</div>
        <div class="glyphs-content__char">L</div>
        <div class="glyphs-content__char">M</div>
        <div class="glyphs-content__char">N</div>
        <div class="glyphs-content__char">O</div>
        <div class="glyphs-content__char">P</div>
        <div class="glyphs-content__char">Q</div>
        <div class="glyphs-content__char">R</div>
        <div class="glyphs-content__char">S</div>
        <div class="glyphs-content__char">Š</div>
        <div class="glyphs-content__char">T</div>
        <div class="glyphs-content__char">U</div>
        <div class="glyphs-content__char">V</div>
        <div class="glyphs-content__char">W</div>
        <div class="glyphs-content__char">X</div>
        <div class="glyphs-content__char">Y</div>
        <div class="glyphs-content__char">Z</div>
        <div class="glyphs-content__char">Ž</div>
        <div class="glyphs-content__char">a</div>
        <div class="glyphs-content__char">b</div>
        <div class="glyphs-content__char">c</div>
        <div class="glyphs-content__char">č</div>
        <div class="glyphs-content__char">ć</div>
        <div class="glyphs-content__char">d</div>
        <div class="glyphs-content__char">đ</div>
        <div class="glyphs-content__char">e</div>
        <div class="glyphs-content__char">f</div>
        <div class="glyphs-content__char">g</div>
        <div class="glyphs-content__char">h</div>
        <div class="glyphs-content__char">i</div>
        <div class="glyphs-content__char">j</div>
        <div class="glyphs-content__char">k</div>
        <div class="glyphs-content__char">l</div>
        <div class="glyphs-content__char">m</div>
        <div class="glyphs-content__char">n</div>
        <div class="glyphs-content__char">o</div>
        <div class="glyphs-content__char">p</div>
        <div class="glyphs-content__char">q</div>
        <div class="glyphs-content__char">r</div>
        <div class="glyphs-content__char">s</div>
        <div class="glyphs-content__char">š</div>
        <div class="glyphs-content__char">t</div>
        <div class="glyphs-content__char">u</div>
        <div class="glyphs-content__char">v</div>
        <div class="glyphs-content__char">w</div>
        <div class="glyphs-content__char">x</div>
        <div class="glyphs-content__char">y</div>
        <div class="glyphs-content__char">z</div>
        <div class="glyphs-content__char">ž</div>
        <div class="glyphs-content__char">1</div>
        <div class="glyphs-content__char">2</div>
        <div class="glyphs-content__char">3</div>
        <div class="glyphs-content__char">4</div>
        <div class="glyphs-content__char">5</div>
        <div class="glyphs-content__char">6</div>
        <div class="glyphs-content__char">7</div>
        <div class="glyphs-content__char">8</div>
        <div class="glyphs-content__char">9</div>
        <div class="glyphs-content__char">0</div>
        <div class="glyphs-content__char">‘</div>
        <div class="glyphs-content__char">?</div>
        <div class="glyphs-content__char">’</div>
        <div class="glyphs-content__char">“</div>
        <div class="glyphs-content__char">!</div>
        <div class="glyphs-content__char">”</div>
        <div class="glyphs-content__char">(</div>
        <div class="glyphs-content__char">%</div>
        <div class="glyphs-content__char">)</div>
        <div class="glyphs-content__char">[</div>
        <div class="glyphs-content__char">#</div>
        <div class="glyphs-content__char">]</div>
        <div class="glyphs-content__char">{</div>
        <div class="glyphs-content__char">@</div>
        <div class="glyphs-content__char">}</div>
        <div class="glyphs-content__char">/</div>
        <div class="glyphs-content__char">&amp;</div>
        <div class="glyphs-content__char">\</div>
        <div class="glyphs-content__char">&lt;</div>
        <div class="glyphs-content__char">-</div>
        <div class="glyphs-content__char">+</div>
        <div class="glyphs-content__char">÷</div>
        <div class="glyphs-content__char">×</div>
        <div class="glyphs-content__char">=</div>
        <div class="glyphs-content__char">&gt;</div>
        <div class="glyphs-content__char">®</div>
        <div class="glyphs-content__char">©</div>
        <div class="glyphs-content__char">$</div>
        <div class="glyphs-content__char">€</div>
        <div class="glyphs-content__char">£</div>
        <div class="glyphs-content__char">¥</div>
        <div class="glyphs-content__char">¢</div>
        <div class="glyphs-content__char">:</div>
        <div class="glyphs-content__char">;</div>
        <div class="glyphs-content__char">,</div>
        <div class="glyphs-content__char">.</div>
        <div class="glyphs-content__char">*</div>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>

<style>
.glyphs-content__char {
  font-family: 'Pica';
  font-weight: 400;
  font-style: normal;
  align-items: center;
  border: 1px solid #dadce0;
  border: 1px solid #5f6368;
  display: inline-flex;
  height: 41px;
  justify-content: center;
  margin-left: -1px;
  margin-top: -1px;
  width: 44px;
}
</style>
