// import {Model as BaseModel} from 'vue-api-query'
import StaticModel from './StaticModel'

export default class Model extends StaticModel {
  // Define a base url for a REST API
  baseURL() {
    return 'https://api.victortolbert.com'
  }

  // Implement a default request method
  request(config) {
    return this.$http.request(config)
  }

  export() {
    let base = this._fromResource || `${this.baseURL()}/${this.resource()}`
    base = this._customResource
      ? `${this.baseURL()}/${this._customResource}`
      : base
    let url = `${base}${this._builder.query()}`

    return window.location.replace(url)
  }

  /**
   * overide to set default data wrapping
   */
  _create() {
    return this.request({
      method: 'POST',
      url: this.endpoint(),
      data: this,
    }).then(response => {
      let self = Object.assign(this, response.data.data || response.data)
      return self
    })
  }
  /**
   * overide to set default data wrapping
   */
  _update() {
    return this.request({
      method: 'PUT',
      url: this.endpoint(),
      data: this,
    }).then(response => {
      let self = Object.assign(this, response.data.data || response.data)
      return self
    })
  }

  _date_diff_days(d1, d2) {
    let ONE_DAY = 1000 * 3600 * 24
    var diff = d2.getTime() - d1.getTime()
    return Math.ceil(diff / ONE_DAY)
  }

  date_diff(d1, d2, type) {
    return this._date_diff_days(d1, d2)
  }

  metrics() {
    let base = this._fromResource || `${this.baseURL()}/${this.resource()}`
    base = this._customResource
      ? `${this.baseURL()}/${this._customResource}`
      : base
    let url = `${base}/metrics${this._builder.query()}`

    return this.request({
      url,
      method: 'GET',
    }).then(response => {
      return response
    })
  }
}
