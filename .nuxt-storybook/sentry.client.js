import VueLib from 'vue'
import * as Sentry from '@sentry/browser'

import {
  Dedupe,
  ExtraErrorData,
  ReportingObserver,
  RewriteFrames,
  Vue,
} from '@sentry/integrations'

export default function (ctx, inject) {
  /* eslint-disable object-curly-spacing, quote-props, quotes, key-spacing, comma-spacing */
  const config = {
    dsn:
      'https:\u002F\u002Fc30dc69c78434050aed6f64b97cbd645@o244691.ingest.sentry.io\u002F1422222',
    environment: 'development',
    maxBreadcrumbs: 50,
    debug: false,
    release: '01076b88b5d7767d598e4c5370f6a47916213f03',
  }
  config.integrations = [
    new Dedupe({}),
    new ExtraErrorData({}),
    new ReportingObserver({}),
    new RewriteFrames({}),
    new Vue({Vue: VueLib, ...{attachProps: true, logErrors: true}}),
  ]

  /* eslint-enable object-curly-spacing, quote-props, quotes, key-spacing, comma-spacing */
  Sentry.init(config)

  inject('sentry', Sentry)
  ctx.$sentry = Sentry
}
