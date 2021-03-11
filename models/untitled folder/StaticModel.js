import {Model as BaseModel} from 'vue-api-query'
/**
 *  Provide static calls for all methods.
 *
 *  Instead this: let users = new User().with('country').get()
 *  We can do this: let users = User.with('conutry').get()
 *
 */
export default class StaticModel extends BaseModel {
  static metrics() {
    let self = this.instance()
    return self.metrics()
  }
}
