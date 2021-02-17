import Model from './Model'
import User from './User'

export default class Comment extends Model {
  resource() {
    return 'comments'
  }

  relations() {
    return {
      user: User,
      children: Comment,
    }
  }
}
