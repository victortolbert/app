import faker from 'faker'

const seedUsers = function (quantity, data) {
  for (let i = 1; i <= quantity; i++) {
    const gender = faker.random.number({min: 1, max: 2})
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)

    data.users.push({
      id: i,
      name: faker.name.findName(firstName, lastName, gender),
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName).toLowerCase(),
      gender,
      dateOfBirth: faker.date.past(55, new Date()),
      ocuppation: faker.name.jobTitle(),
      avatar: faker.internet.avatar(),
    })
  }
}

const db = function () {
  const data = {
    users: [],
  }

  seedUsers(100, data)

  return data
}

export default db
