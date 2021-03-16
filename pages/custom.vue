<script>
const customIconConfig = {
  iconComponent: undefined,
  customIconPacks: {
    ionicons: {
      sizes: {
        default: 'is-size-5',
        small: '',
        medium: 'is-size-3',
        large: 'is-size-1',
      },
      iconPrefix: 'ion-md-',
      internalIcons: {
        check: 'checkmark',
        information: 'information',
        'check-circle': 'checkmark-circle-outline',
        alert: 'alert',
        'alert-circle': 'alert',
        'arrow-up': 'arrow-up',
        'chevron-right': 'arrow-forward',
        'chevron-left': 'arrow-back',
        'chevron-down': 'arrow-down',
        eye: 'eye',
        'eye-off': 'eye-off',
        'caret-down': 'arrow-dropdown',
        'caret-up': 'arrow-dropup',
      },
    },
  },
}
export default {
  data() {
    return {
      docsIcon: undefined,
    }
  },
  created() {
    this.$oruga.config.setOptions(customIconConfig)
  },
  beforeCreate() {
    // only for docs purpose
    const docsIcon = this.$oruga.config.getOptions().iconComponent
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        this.$oruga.config.setOptions({
          iconComponent: docsIcon,
        })
      })
    }
  },
}
</script>

<template>
  <article>
    <div class="block">
      <OIcon pack="ionicons" icon="person" size="small" />
      <OIcon pack="ionicons" icon="home" size="small" />
      <OIcon pack="ionicons" icon="apps" size="small" />
    </div>

    <div class="block">
      <OIcon pack="ionicons" icon="person" />
      <OIcon pack="ionicons" icon="home" />
      <OIcon pack="ionicons" icon="apps" />
    </div>

    <div class="block">
      <OIcon pack="ionicons" icon="person" size="medium" />
      <OIcon pack="ionicons" icon="home" size="medium" />
      <OIcon pack="ionicons" icon="apps" size="medium" />
    </div>

    <div class="block">
      <OIcon pack="ionicons" icon="person" size="large" variant="success" />

      <OIcon pack="ionicons" icon="home" size="large" variant="info" />
      <OIcon pack="ionicons" icon="apps" size="large" variant="primary" />
    </div>

    <OButton variant="primary">
      <OIcon pack="ionicons" icon="checkmark" />
      <span>Finish</span>
    </OButton>

    <OButton variant="warning">
      <OIcon pack="ionicons" icon="checkmark" />
      <span>Finish</span>
    </OButton>

    <OButton variant="warning">
      <OIcon spin pack="ionicons" icon="refresh" />
      <span>Refresh</span>
    </OButton>
  </article>
</template>



<style>
@import 'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css';
</style>
