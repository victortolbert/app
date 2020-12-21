import {addons} from '@storybook/addons'
import {create} from '@storybook/theming/create'

const theme = create({
  base: 'dark',
  brandTitle: 'Lab',
  brandUrl: 'https://lab.tolbert.design',
})

addons.setConfig({
  showRoots: true,
  panelPosition: 'bottom',
  theme,
})
