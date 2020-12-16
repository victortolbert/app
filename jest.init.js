import VueTestUtils from '@vue/test-utils'
import translations from './translations.js'

const locale = 'en'

VueTestUtils.config.mocks.$t = msg => translations[locale][msg]
