import Model from './Model'
import User from './User'
import Tag from './Tag'
import Comment from './Comment'

export default class Post extends Model {
  // Set the resource route of the model
  resource() {
    return 'posts'
  }

  comments() {
    return this.hasMany(Comment)
  }

  relations() {
    return {
      user: User,
      'relationships.tags': Tag,
    }
  }

  // Define the primary key of the model
  primaryKey() {
    return 'slug'
  }
}
