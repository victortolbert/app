<template>
  <div class="language" role="radiogroup" aria-labelledby="language-switcher1">
    <p class="hidden" id="language-switcher1">
      Choose a language for this website
    </p>
    <div class="language__container--left language__container--fr">
      <input
        class="language__control"
        type="radio"
        id="language1-1"
        name="language-switch1"
      />
      <label class="language__label" for="language1-1">
        FR<span class="hidden"> Français</span>
      </label>
    </div>
    <div class="language__container--right language__container--en">
      <input
        class="language__control"
        type="radio"
        id="language1-2"
        name="language-switch1"
      />
      <label class="language__label" for="language1-2">
        EN<span class="hidden"> English</span>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
$language-width: 55px;
$language-height: 30px;
$language-focus: #85bffd;
$language-border: #ccc;
$language-hover: #eee;
$language-checked: #ddd;
$white: #fff;

// language styles

.language {
  width: $language-width * 2;
  height: $language-height;
  font-size: 14px;
  line-height: 1;
  margin: 1em 0;
}

.language__container--left,
.language__container--right {
  position: relative;
  float: left;
  width: $language-width;
  height: $language-height;
  padding: 5px;
}

.language__label {
  position: absolute;
  top: 0;
  left: 0;
  width: $language-width;
  height: $language-height;
  border: 1px solid $language-border;
  padding: 7px 8px 5px 0;
  background-color: $white;
  background-repeat: no-repeat;
  background-position: 7px 7px;
  background-size: 14px;
  text-align: right;
  text-transform: uppercase;
}

.language__container--left .language__label {
  border-radius: 4px 0 0 4px;
}

.language__container--right .language__label {
  border-left: 0;
  border-radius: 0 4px 4px 0;
}

.language__control:hover + .language__label,
.language__control:focus + .language__label {
  background-color: $language-hover;
}

.language__control:checked + .language__label {
  background-color: $language-checked;
}

.language__control:focus + .language__label,
.language__control:checked:focus + .language__label {
  z-index: 2;
  outline: 2px solid $language-focus;
  box-shadow: 0 0 8px $language-focus;
}

// country flags -->

.language__container--fr .language__label {
  background-image: url('/img/flags/fr.svg');
}

.language__container--en .language__label {
  background-image: url('/img/flags/gb.svg');
}
</style>
