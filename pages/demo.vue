<template>
  <div id="demo" class="min-h-full">
    <div class="min-h-full contain">
      <div class="moda">
        <p class="warning">
          <strong
            >This only works in the
            <a href="http://nightly.webkit.org/">Webkit Nightlies</a>!</strong
          >
        </p>
        <p>
          The background image should be pleasantly blurred under this box,
          <a href="https://i.imgur.com/z7s7uf6.png">like so</a>.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis,
          quae distinctio magnam, laborum iusto itaque autem! Molestiae enim
          distinctio molestias, dolores ea quasi magni nisi aspernatur magnam,
          voluptate eum fuga.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.moda {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 5px;
  color: #333;
  font-family: sans-serif;
  line-height: 1.5;
  max-width: 50%;
  padding: 1rem 2rem;
  a {
    color: #bf0222;
  }
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .moda {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5);
  }
  .warning {
    display: none;
  }
}

html,
body {
  height: 100%;
  width: 100%;
}

#demo {
  background-image: url('https://41.media.tumblr.com/efd15be8d41b12a7b0ef17fba27c3e20/tumblr_mqqy59HMaf1qzattso1_1280.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.contain {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
