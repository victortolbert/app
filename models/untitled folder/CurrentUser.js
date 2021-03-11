import User from './User'

export default class CurrentUser extends User {
  getPrimaryKey() {
    return 'current'
  }
}
