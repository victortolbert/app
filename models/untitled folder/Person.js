import Model from './Model'
import Post from './Post'

export default class Person extends Model {
  // Set the resource route of the model
  resource() {
    return 'people'
  }

  posts() {
    return this.hasMany(Post)
  }

  // Computed properties are reactive -> person.fullName
  // Make sure to use "get" prefix
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  // Method -> person.makeBirthday()
  makeBirthday() {
    return (this.age += 1)
  }
}
