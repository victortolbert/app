##

## Vue API Query

```js
    const affiliates = await Affiliate.get() // all, $get, $all
    const affiliate = await Affiliate.first() // $first
    const affiliate = await Affiliate.find(45) // $find
    const affiliates = await Affiiate.where('status', 'published').get() // Filter
    const volunteers = await Volunteer.where(['user', 'status'], 'active').get() // only get results where status of user is active:
    const volunteers = await Volunteer.whereIn('status', ['published', 'archived']).get() // only get results where status of user is active
    const volunteers = await Volunteer.whereIn(['user', 'status'], ['active', 'inactive']).get()// only get results where status of user is active or inactive:
    const volunteers = await Volunteer.orderBy('-created_at').get() // sort our Volunteers by the created_at date:
    const volunteers = await Volunteer.orderBy('-created_at', 'title').get() // sort by their title too
    const volunteers = await Volunteer.include('category', 'tags').get() // eager load the relationships category and tags of our Volunteer
    const volunteers = await Volunteer.append('likes', 'shares').get() //  append the attribute likes and shares of our Volunteer:
    const volunteers = await Volunteer.select('title', 'text').get() // select only the title and the text fields of our Volunteer model:
    const volunteers = await Volunteer.include('category').select({ volunteers: ['title', 'text'], category: ['name']}).get() // select only the name field of the category we have to eager loaded
    const volunteers = await Volunteer.page(1).limit(20).get()
    const volunteers = await Volunteer.custom('volunteers/latest').get()
    const user = new User({ id: 1 })
    const volunteers = await Volunteer
      .where('status', 'published')
      .include('category')
      .append('likes')
      .select('title', 'text')
      .orderBy('-created_at')
      .page(1)
      .limit(20)
      .params({ process: false })
      .custom(user, volunteer, 'latest')
      .get()

    const volunteer = new Volunteer()
    volunteer.firstName = 'Victor'
    volunteer.lastName = 'Tolbert'
    await volunteer.save()

    const volunteer = await Volunteer.find(1)
    volunteer.text = 'An updated text for our Volunteer!'
    await volunteer.save()

    const volunteer = await Volunteer.find(1)
    volunteer.text = 'An updated text for our Volunteer!'
    await volunteer.patch()

    const volunteer = await Volunteer.find(1)
    await volunteer.delete()


    // Create a note for a volunteer
    const volunteer = await Volunteer.find(1)
    const note = new Note({
      text: 'Awesome volunteer!'
    }).for(volunteer)

    await note.save()


    // Create a Case for an Volunteer of an Affiliate
    // Create a Comment for a Post of a User
    const affiliate = await Affiliate.find(1)
    const volunteer = await affiliate.volunteers().first()
    const case = new Case({
      text: 'Case entry for an volunteer of an affiliate'
    }).for(affiliate, volunteer)
    await case.save()

    // Create a Case for an Volunteer
    const volunteer = await Volunteer.find(1)
    const case = await volunteer.cases().attach({
      text: 'Awesome volunteer!'
    })

    const volunteer = await Volunteer.find(1)
    const comment = await volunteer.comments().sync({
      text: 'Awesome volunteer!'
    })
```
