<template>
  <div>
    <a class="wavy-link" href="#" role="button">A wavy link</a>

    <FeaturedVideo id="gwlDorikqgY" />

    🌜 🌞

    <o-field label="Simple">
      <o-select
        expanded
        select-class="block w-full border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        placeholder="Select a name"
      >
        <option value="flint">Flint</option>
        <option value="silver">Silver</option>
      </o-select>
    </o-field>

    <GivingMarketPaymentForm
      :program="$store.state.program"
      :relationships="$store.state.relationships"
      :pre-select-amount-options="$store.state.preSelectAmountOptions"
      braintree-merchant-id="clientToken"
      payment-url="payment"
      receipt-url="reciept"
    />

    <div
      class="border-primary-500 group hover:bg-white hover:shadow-lg hover:border-transparent"
    >
      <p class="text-primary-600 group-hover:text-gray-900">New Project</p>
      <p class="text-primary-500 group-hover:text-gray-500">
        Create a new project from a variety of starting templates.
      </p>
    </div>

    <!-- <HighChart /> -->

    <img
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg"
      alt=""
      class="w-32 m-5"
    />

    <img
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg"
      alt=""
      class="w-32 m-5 clipped"
    />

    <img
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg"
      alt=""
      class="w-32 m-5 clip-circle"
    />

    <img
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg"
      alt=""
      class="w-32 m-5 clip-ellipse"
    />

    <img
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg"
      alt=""
      class="w-32 m-5 clip-polygon"
    />
  </div>
</template>

<script>
import GivingMarketPaymentForm from '~/components/GivingMarketPaymentForm.vue'
export default {
  components: {
    GivingMarketPaymentForm,
  },
}
</script>

<style>
.wavy-link {
  display: inline-block;
  text-decoration-line: underline;
  text-decoration-thickness: auto;
  text-decoration-color: red;
  text-decoration-style: wavy;
  white-space: nowrap;
  backface-visibility: hidden;
  user-select: none;
  padding-bottom: 2px;
}

.clip-circle {
  clip-path: circle(60px at center);
}
.clip-ellipse {
  clip-path: ellipse(60px 40px at center);
}
.clip-polygon {
  clip-path: polygon(
    5% 5%,
    100% 0%,
    100% 75%,
    75% 75%,
    75% 100%,
    50% 75%,
    0% 75%
  );
}

.clipped {
  width: 250px;
  height: 250px;
  object-fit: cover;
  clip-path: path(
    'M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9 C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z'
  );
  margin: 0;
}
</style>
