---
title: Laravel
---

## 2016 Laravel v5.3

### Laravel Scout – a driver based full-text search for Eloquent

```sh
php artisan scout:import App\\Post
```

```php
<?php
Post::search('Alice')->get();
Post::search('Alice')->paginate()
Post::search(‘Alice’)—>where('acount_id', '>', 1)->paginate()
```

### Laravel Mailable – a new Mail class for sending emails in an expressive way

```php
Mail::to('laravel@example.com')->send(new OrderComplete);
Mail::to('laravel@example.com')->cc('john@example.com')->queue(new OrderComplete);
```

### Laravel Notifications – allow you to make quick updates through services like Slack, SMS, or Email.

```php
$this->line('Thank you for joining')
    ->action('Button Text', 'http://url.com')
    ->line('If you have any questions please hit reply')
    ->success()

  $this->line('Sorry we had a problem with your order')
    ->action('Button Text', 'http://url.com')
    ->error()
```

### Laravel Passport – an optional package that is a full oAuth 2 server ready to go.

```php
@if($loop->first)
    <!-- Do something on the first iteration -->
@endif

@if($loop->last)
    <!-- Do something on the last iteration -->
@endif
```
