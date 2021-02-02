<template>
  <form @submit.prevent="">
    <!-- A Segment Control is a horizontal control made of multiple segments. It provides a compact means of grouping together a number of controls. -->
    <fieldset>
      <legend>Legend text</legend>
      <ul class="segmented-control segmented-control--stretched">
        <li>
          <input type="radio" id="one" name="choose1" checked />
          <label for="one">one</label>
        </li>
        <li>
          <input type="radio" id="two" name="choose1" />
          <label for="two">two</label>
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Choose a fruit</legend>
      <ul class="form-list">
        <li>
          <input type="radio" id="apple" name="fruit" aria-describedby="d4" />
          <label class="form-label" for="apple">Apple</label>
        </li>
        <li>
          <input type="radio" id="pear" name="fruit" aria-describedby="d4" />
          <label class="form-label" for="pear">Pear</label>
        </li>
        <li>
          <input type="radio" id="bannana" name="fruit" aria-describedby="d4" />
          <label class="form-label" for="bannana">Banana</label>
        </li>
      </ul>
      <p class="error" id="d4">Error: At least one option must be chosen</p>
    </fieldset>
  </form>
</template>

<script>
export default {}
</script>

<style scoped></style>
