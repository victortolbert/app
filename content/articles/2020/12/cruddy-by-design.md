---
title: 'Cruddy By Design'
description:
  Let’s build a blazing fast articles and tutorials app using Nuxt, Dev.to API,
  with lazy loading, placeholders, caching and trendy neumorphic design UI.
imgUrl: blog/build-dev-to-clone-with-nuxt-new-fetch/main.png
date: 2020-12-16
authors:
  - name: Sergey Bedritsky
    avatarUrl: https://pbs.twimg.com/profile_images/1244291720566669315/pGg6Xn-M_400x400.jpg
    link: https://twitter.com/sergeybedritsky
  - name: Sebastien Chopin
    avatarUrl: https://pbs.twimg.com/profile_images/1042510623962275840/1Iw_Mvud_400x400.jpg
    link: https://twitter.com/Atinux
tags:
  - Nuxt
  - Fetch
  - Asynchronous Data Fetching
  - API
---

At Laracon 2017, Adam Wathan shared some strategies that he uses to split large
controllers into multiple small controllers.

The core idea is to try and stick to the 7 standard REST/CRUD actions in your
controllers:

- Index
- Show
- Create
- Store
- Edit
- Update
- Destroy

Using this convention as a "rule" is a good way to force yourself to keep your
controllers from becoming bloated, and can often lead to learning interesting
new things about your domain.

## Tip 1: Give nested resources a dedicated controller #1

When dealing with nested resources in an application, you often end up with
routes like this:

```
/podcasts/(:id)/episodes
```

When you have an endpoint like this, which controller do you use and what do you
call the action?

### ❌ Option 1: `Podcasts` controller

Since `/podcasts` is the top level resource, it's common to use the `Podcasts`
controller for these sorts of nested index actions.

This can work but it forces you to define a "custom action"; something that
isn't part of the 7 standard REST/CRUD actions that exist on a resource
controller.

In this example, we started with an action on `Podcasts` controller called
`list_episodes`. If we want to stick to only the 7 standard controller actions,
what else could we do?

### ❌ Option 2: `Episodes` controller

Since this action is a list of episodes, you might think "hey, let's make this
`episodes/index`!"

But there's a problem: we already have an `episodes/index` action! In our case,
it lists all episodes across all podcasts.

**Antipattern: Optional route parameters**

One thing I've seen folks do in this case is re-use `episodes/index` for two
different use cases: listing all episodes or listing an individual podcast's
episodes.

That usually looks like this in a routes file:

```php
$route['episodes']                 = 'episodes/index';
$route['podcasts/(:id)/episodes']  = 'episodes/index';
```

...and like this in the controller:

```php
class Episodes extends CI_Controller
{
    public function index($id = null)
    {
        if ($id === null) {
            $episodes = Episode::with('podcast')->recent()->paginate(25);

            return view('episodes.index', [
                'episodes' => $episodes,
            ]);
        } else {

            $podcast = Podcast::with('episodes')->findOrFail($id);

            abort_unless($podcast->isVisibleTo(Auth::user()), 404);

            return view('podcasts.list-episodes', [
                'podcast' => $podcast,
            ]);
        }
    }
}
```

The problem with this approach is that you are taking two completely different
actions from the user's point of view and stuffing them all into one action that
has to reverse-engineer the intent of the user based on the presence of the
route parameter.

These actions have literally nothing in common:

- Load different models
- Have different permission checks
- Return different views
- Pass different data to the views

If our goal is to use more controllers to simplify our code, this isn't helping.
We actually have one less controller action than before, resulting in another
controller action getting much more complicated.

_Don't reuse a single controller action for two different user actions._

### ✅ Option 3: Dedicated `Podcast_episodes` controller

If we want to stick to only standard actions, that means we want to use an
`index` action here. But what is the resource we are requesting an `index` of?

You could say it's `episodes`, but we're not requesting an index of `all`
episodes. It's a specific _podcast's_ episodes, so you could say we want an
index of "podcast episodes".

If we create a brand new controller for this, here's what our route definition
would look like:

```php
$route['podcasts/(:id)/episodes']  = 'podcast_episodes/index';
```

...and here's the controller with it's action:

```php
class Podcast_episodes extends CI_Controller
{
    public function index($id)
    {
        $podcast = Podcast::with('episodes')->findOrFail($id);

        abort_unless($podcast->isVisibleTo(Auth::user()), 404);

        return view('podcast-episodes.index', [
            'podcast' => $podcast,
        ]);
    }
}
```

When taking this approach, I usually make my template folder structure match the
controller name, as you can see above with the `podcast-episodes.index` view.

**Side benefit: Attracting existing nested resource endpoints**

If you look in the routes file, you'll see we have two other `episodes` related
endpoints nested under the top-level `podcasts` resource:

```php
$route['podcasts/(:id)/episodes/new']     = 'episodes/create');
$route['podcasts/(:id)/episodes']['post'] = 'episodes/store'
```

This isn't bad on it's own, but it's sort of awkward that inside of `Episodes`
Controller, the `$id` route parameter has multiple meanings.

For example, here it represents an `Episode` ID:

```php
public function show($id)
{
    $episode = Episode::with('podcast')->findOrFail($id);

    abort_unless($episode->isVisibleTo(Auth::user()), 404);

    return view('episodes.show', [
        'episode' => $episode,
    ]);
}
```

...but in our `create` action, it represents a `Podcast` ID:

```php
public function create($id)
{
    $podcast = Auth::user()->podcasts()->findOrFail($id);

    return view('episodes.create', ['podcast' => $podcast]);
}
```

To me this is a bit of a smell.

_Each controller should only be concerned about the ID of one type of resource._

Now that we have a dedicated `Podcast_episodes` controller, we can move our
`create` and `store` actions alongside our new `index` action, and now the `$id`
parameter will always refer to a `Podcast` ID:

```php
$route['podcasts/(:id)/episodes'],         = 'podcast_episodes/index';
$route['podcasts/(:id)/episodes']['post']  = 'podcast_episodes/store';
$route['podcasts/(:id)/episodes/new']      = 'podcast_episodes/create';
```

After this refactoring, we're left with 3 controllers:

- `Podcasts` controller, with 7 standard actions and 5 custom actions
- `Episodes` controller`, with 4 standard actions and no custom actions
- `Podcast_episodes` controller, with 3 standard actions and no custom actions

## Tip 2: Treat properties edited independently as separate resources

The next custom action I'd like to look at is `podcasts/update_cover_image`.

Here's the endpoint:

```php
$route['podcasts/(:id)/update-cover-image']['post']  = 'podcasts/update_cover_image';
```

If we want to remodel this custom action as a standard REST action, what should
our endpoint be and what controller should we use?

Evaluating against our list of REST actions:

- Index
- Show
- Create
- Store
- Edit
- Update
- Destroy

...it seems like "update" is probably our best choice, but what is the resource
we are updating?

If you look at the current implementation, you can see that all we are really
doing is updating a field on the`podcasts` table:

```php
public function update_cover_image($id)
{
    $podcast = Auth::user()->podcasts()->findOrFail($id);

    request()->validate([
        'cover_image' => ['required', 'image', Rule::dimensions()->minHeight(500), Rule::dimensions()->minWidth(500)],
    ]);

    $podcast->update([
        'cover_path' => request()->file('cover_image')->store('images', 'public'),
    ]);

    return redirect("/podcasts/{$podcast->id}");
}
```

You might think that what we are doing here is an "update" action against our
`podcasts` resource, but similar to our nested resource example, we already have
an "update" action for podcasts:

```php
public function update($id)
{
    $podcast = Auth::user()->podcasts()->findOrFail($id);

    request()->validate([
        'title' => ['required', 'max:150'],
        'description' => ['max:500'],
        'website' => ['url'],
    ]);

    $podcast->update(request([
        'title',
        'description',
        'website',
    ]));

    return redirect("/podcasts/{$podcast->id}");
}
```

This action is used to update the basic fields for a podcast, and is exposed
through a completely separate form in the UI than `update_cover_image`.

We could try to piggy back off of this action, but remember, we don't want to
re-use a single controller action for multiple user actions otherwise we risk
introducing more complexity into our controller.

So what should we do?

### ✅ Create a dedicated `Podcast_cover_image` controller

Resources exposed through your controllers and endpoints don't have to map
one-to-one with your models or database tables.

If a user edits one part of model using a different form than another part of a
model, you should probably expose it as it's own resource.

So instead of making a `POST` request to `update-cover-image`, lets make a `PUT`
request that treats the cover image like it's own resource:

```diff
- $route['/podcasts/(:id)/update-cover-image']['post'] = 'podcasts@update_cover_image'];
+ $route['/podcasts/(:id)/cover-image']['put']         = 'podcast_cover_image/update'];
```

Once we create that new controller and move the old
`podcasts/update_cover_image` action over to `podcast_cover_image/update`, we're
left with the following controllers:

- `Podcasts`, with 7 standard actions and 4 custom actions
- `Episodes`, with 4 standard actions and no custom actions
- `Podcast_episodes`, with 3 standard actions and no custom actions
- `Podcast_cover_image`, with 1 standard action and no custom actions

## Tip 3: Treat pivot models as their own resource

The next custom actions I'd like to look at are `podcasts/subscribe` and
`podcasts/unsubscribe`.

Here are the endpoints:

```php
$route['/podcasts/(:id)/subscribe']['post']   = 'podcasts/subscribe';
$route['/podcasts/(:id)/unsubscribe']['post'] = 'podcasts/unsubscribe';
```

Modelling these endpoints as standard REST actions is a little trickier than our
previous examples, because how do we translate subscribe to something like
`store`, `update`, or `destroy`?

Let's try modelling it as a store action first. The trick is to ask yourself
this question:

_"After subscribing, what do I have now that I didn't have before?"_

If you can answer that question reasonably, it's probably possible to model the
custom action you're refactoring as a store action.

In our case, after subscribing to a podcast, we now have a subscription, which
is something we didn't have before. Let's create a new controller!

### ✅ Create a dedicated `Subscriptions` controller

If we are creating a new subscription, the standard endpoint structure would be
something like this:

```diff
- $route['/podcasts/(:id)/subscribe']['post'] = 'podcasts/subscribe'];
+ $route['/subscriptions']['post']            = 'subscriptions/store'];
```

Something worth noticing here is that previously our endpoint had a route
parameter, the `(:id)` of the podcast we were subscribing to. Since our new
endpoint doesn't have that parameter, we'll have to pass it through in the
request body.

Here's what our new controller action would look like now:

```php
class Subscriptions extends CI_Controller
{
    public function store()
    {
        $podcast = Podcast::published()->findOrFail(request('podcast_id'));

        $podcast->users()->attach(Auth::user());

        return response('', 204);
    }
}
```

**Modelling unsubscribe**

Let's tackle `unsubscribe` next. If `subscribe` becomes _creating_ a
subscription, then maybe `unsubscribe` should become _destroying_ a
subscription!

The standard endpoint structure for _destroying_ a resource would look something
like this:

```diff
- $route['/podcasts/(:id)/unsubscribe']['post'] = 'podcasts/subscribe';
+ $route['/subscriptions/(:id)']['delete']      = 'subscriptions/destroy';
```

But wait a minute: notice how our `/subscriptions` endpoint there has an `(:id)`
parameter? Subscriptions aren't real models in our system; we don't have the
concept of an `id` for a particular subscription.

How do we delete a subscription by `id` if subscriptions don't have IDs?

**Uncovering a new model**

If you look at our implementation, you'll see that subscribing to a podcast
creates a new record in our `podcast_user` pivot table:

```php
$podcast->users()->attach(Auth::user());
```

If you think about it, doesn't each one of those records represent a user's
_subscription_ to a podcast? Each one of those records has an ID, but how can we
get it?

Well if we rename `podcast_user` to `subscriptions`, we can also create an model
for working with that table directly called `Subscription_model`. Since this
table has foreign keys back to `users` and `podcasts`, we could even define
those as `belongsTo` relationships on the new model:

```php
class Subscription_model extends CI_Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function podcast()
    {
        return $this->belongsTo(Podcast::class);
    }
}
```

Remember the line in our controller where we added a pivot record through the
`attach` method? What if we just explicitly create a new subscription instead?

```php
class Subscriptions extends CI_Controller
{
    public function store()
    {
        $podcast = Podcast::published()->findOrFail(request('podcast_id'));

        $subscription = Subscription::create([
            'user_id' => Auth::user()->id,
            'podcast_id' => $podcast->id,
        ]);

        return $subscription;
    }
}
```

Now that we are able to expose a `Subscription_model` as it's own resource, it's
not so far fetched to expect someone to have the `id` of the subscription they
want to destroy when unsubscribing.

Here's what the controller action could look like:

```php
public function destroy($id)
{
    $subscription = Auth::user()->subscriptions()->findOrFail($id);

    $subscription->delete();

    return response('', 204);
}
```

Here's what we're left with after this refactoring:

- `Podcasts` controller, with 7 standard actions and 2 custom actions
- `Episodes` controller, with 4 standard actions and no custom actions
- `Podcast_episodes` controller, with 3 standard actions and no custom actions
- `Podcast_cover_image` controller, with 1 standard action and no custom actions
- `Subscriptions` controller, with 2 standard actions and no custom actions

## Tip 4: Think of different states as different resources

The last custom actions we have are `podcasts/publish` and `podcasts/unpublish`.

Here are the endpoints:

```php
$route['/podcasts/{id}/publish']['post']   = 'podcasts/publish';
$route['/podcasts/{id}/unpublish']['post'] = 'podcasts/unpublish';
```

At first glance you might think:

_"All we're doing is updating the `published_at` column, let's use
`podcasts/update` for this."_

But we already have an `update` action, and as we've already discussed, trying
to cram two actions into one is a recipe for complexity.

So how can we model "publish" as it's own standard REST action?

If we ask ourselves the same question we did in the previous refactoring:

_"After publishing a podcast, what do I have now that I didn't have before?"_

...one answer that comes to mind is a "published podcast."

So what would it look like to model "publishing a podcast" as "creating a
published podcast"?

### ✅ Create a dedicated `Published_podcasts` controller

In these situations, it can often be helpful to think of a resource in a certain
state as it's own independent resource.

If we are creating a new "published podcast", the standard endpoint structure
look like this:

```diff
- $route['podcasts/{id}/publish']['post'] = 'podcasts/publish';
+ $route['published-podcasts']['post']    = 'published_podcasts/store';
```

As before, we lose the `{id}` route parameter here, so we'll need to pass that
through the request body.

This feels pretty natural when you think of the request body as being the "raw
materials" needed to create the resource. When you are creating a published
podcast, the raw materials needed are an existing unpublished podcast, and the
best way to represent that entity is with it's identifier.

Here's what our new controller action would look like:

```php
class Published_podcasts extends CI_Controller
{
    public function store()
    {
        $podcast = Auth::user()->podcasts()->findOrFail(request('podcast_id'));

        $podcast->publish();

        return $podcast;
    }
}
```

One thing to note here is the return value. Previously we were returning an
empty `204` response, but now that we're "creating" a new resource, returning
the model seems more appropriate.

**Modelling `unpublish`**

Just like `subscribe`, if `publish` becomes _creating_ a published podcast, then
`unpublish` could become _destroying_ a published podcast.

This one probably requires the biggest mental leap of any of our refactorings so
far, but I promise that in practice it doesn't end up feeling as weird as it
first sounds.

Here's what the endpoint would become:

```diff
- $route['podcasts/(:id)/unpublish']['post']    = 'podcasts/unpublish';
+ $route['published-podcasts/(:id)']['delete']  = 'published_podcasts/destory';
```

"Published podcasts" don't have any sort of special unique ID; instead their ID
is the same as a regular podcast's ID, so that's what our `{id}` parameter will
represent here.

Here's what the full controller would look like:

```php
class Published_podcasts extends CI_Controller
{
    public function store()
    {
        $podcast = Auth::user()->podcasts()->findOrFail(request('podcast_id'));

        $podcast->publish();

        return $podcast;
    }

    public function destroy($id)
    {
        $podcast = Auth::user()->podcasts()->findOrFail($id);

        $podcast->unpublish();

        return $podcast;
    }
}
```

After this refactoring, here's where we stand:

- `Podcasts` controller, with 7 standard actions and no custom actions
- `Episodes` controller, with 4 standard actions and no custom actions
- `Podcast_episodes` controller, with 3 standard actions and no custom actions
- `Podcast_cover_image` controller, with 1 standard action and no custom actions
- `Subscriptions` controller, with 2 standard actions and no custom actions
- `Published_podcasts` controller`, with 2 standard actions and no custom
  actions

That's 6 controllers with an average of ~3 methods per controller. Small, clean,
and simple!

- <https://www.youtube.com/watch?v=MF0jFKvS4SI&feature=youtu.be>
- <https://github.com/adamwathan/laracon2017>
- <http://jeromedalbert.com/how-dhh-organizes-his-rails-controllers/>
- <https://twitter.com/dhh/status/453180147727093760>
