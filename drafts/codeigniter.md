---
title: CodeIgniter
category: Documentation
position: 2
---

## Ion Auth

### Installation

1. Download the latest version:
   https://github.com/benedmunds/CodeIgniter-Ion-Auth/zipball/3
2. Copy the files from this package to the correspoding folder in your
   application folder. For example, copy Ion_auth/config/ion_auth.php to
   system/application/config/ion_auth.php.
3. You can also copy the entire directory structure into your third_party/
   folder. For example, copy everything to /application/third_party/ion_auth/
4. Run the appropriate SQL file from the /sql directory.

The default login is:

```
Email: admin@admin.com
Password: password
```

### Upgrading

1. Download the latest version:
   https://github.com/benedmunds/CodeIgniter-Ion-Auth/zipball/3
2. Overwrite "libraries/ion_auth.php" and "models/ion_auth_model.php" with the
   new versions.
3. Overwrite "language/\*" with the news versions.
4. Check "config/ion_auth.php" for evolution.

Upgrading from Ion Auth 2? Check the UPGRADING.md file in the package.

### Loading Ion Auth

You load Ion Auth just like any other library:

```php
$this->load->library('ion_auth');
```

Do make sure to load your database connection first, that can be loaded manually
or autloaded.

You can also autoload the library.

### Configuration Options

Ion Auth is extremely configurable.

To change configuration options simply edit the `config/ion_auth.php` file or
pass an array when loading the library.

#### Tables

| Option                     | Default        | Description                                        |
| -------------------------- | -------------- | -------------------------------------------------- |
| `tables['groups']`         | groups         | The table name to use for the groups table         |
| `tables['users']`          | users          | The table name to use for the users table          |
| `tables['users_groups']`   | users_groups   | The table name to use for the users groups table   |
| `tables['login_attempts']` | login_attempts | The table name to use for the login attempts table |
| `join['users']`            | user_id        | Users table column you want to join WITH           |
| `join['groups']`           | group_id       | Group table column you want to join WITH           |

#### Hash method

| Option        | Default | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hash_method` | bcrypt  | The method to hash the password before storing in database. You can choose between bcrypt (from PHP 5.3) or argon2 (from PHP 7.2). Argon2 is recommended by expert (it is actually the winner of the Password Hashing Competition. Passwords are automatically salted before hashing (everything is stored in the same 'password' column). For more information, check the password_hash function help. |

##### Bcrypt-specific options

| option                | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bcrypt_default_cost` | 10      | This defines how strong the encryption will be. However, higher the cost, longer it will take to hash (CPU usage). So adjust this based on your server hardware                                                                                                                                                                                                                                            |
| `bcrypt_admin_cost`   | 12      | Same as `bcrypt_default_cost`, but for users in the admin group. It is recommended to have a stronger hashing for administrators. You should benchmark your server to find the best cost value. It is recommended to have a hash taking at least 100ms (500ms for administrators). This can be done easily with this little script for bcrypt. It is not recommended (in 2018) to use a value less than 10 |

##### Argon2-specific options

| option                  | Default                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `argon2_default_params` | ['memory_cost' => 1 << 12, 'time_cost' => 2, 'threads' => 2] | This is an array containing the options for the Argon2 algorithm. The following keys can be set: ['memory_cost']: Maximum memory (in kBytes) that may be used to compute the Argon2 hash. The spec recommends setting the memory cost to a power of 2. ['time_cost']: Number of iterations (used to tune the running time independently of the memory size). This defines how strongthe encryption will be. ['threads']: Number of threads to use for computing the Argon2 hash. The spec recommends setting the memory cost to a power of 2 |
| `argon2_admin_params`   | ['memory_cost' => 1 << 14, 'time_cost' => 4, 'threads' => 2] | Same as argon2_default_params, but for users in the admin group. It is recommended to have a stronger hashing for administrators                                                                                                                                                                                                                                                                                                                                                                                                             |

You should benchmark your server to find the best parameters. It is recommended
to have a hash taking at least 100ms (500ms for administrators). This can be
done easily with this little script for argon2 . The argon2 algorithm doesn't
have _bad parameters_ (even with time_cost at 1) but remember that longer the
hashing, stronger the security.

#### Authentication options

| option                       | Default           | Description                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site_title`                 |                   | The title of your site, used for email                                                                                                                                                                                                                                                                                                                               |
| `admin_email`                | admin@example.com | Your administrator email address                                                                                                                                                                                                                                                                                                                                     |
| `default_group`              | members           | Name of the default user group                                                                                                                                                                                                                                                                                                                                       |
| `admin_group`                | admin             | Name of the admin group                                                                                                                                                                                                                                                                                                                                              |
| `identity`                   | email             | Column to use for uniquely identifing user/logging in/etc. Usual choices are 'email' OR 'username', but any unique key from your table can be used as identity. IMPORTANT: If you are changing it from the default (email), update the UNIQUE constraint in your DB                                                                                                  |
| `min_password_length`        | 8                 | Minimum length of passwords. This minimum is not enforced directly by the library. The controller should define a validation rule to enforce it. See the Auth controller for an example implementation. Additional note: the library will fail for empty password or password size above 4096 bytes. This is an arbitrary (long) value to protect against DOS attack |
| `email_activation`           | false             | TRUE or FALSE. Sets whether to require email activation or not                                                                                                                                                                                                                                                                                                       |
| `manual_activation`          | false             | TRUE or FALSE. Sets whether to require manual activation (probably by an admin user) or not                                                                                                                                                                                                                                                                          |
| `remember_users`             | true              | TRUE or FALSE. Sets whether to enable 'remember me' functionality or not                                                                                                                                                                                                                                                                                             |
| `user_expire`                | 86500             | Sets how long to remember the user for in seconds. Set to zero for no expiration                                                                                                                                                                                                                                                                                     |
| `user_extend_on_login`       | false             | TRUE or FALSE. Extend the users session expiration on login                                                                                                                                                                                                                                                                                                          |
| `track_login_attempts`       | false             | Track the number of failed login attempts for each user or ip (see track_login_ip_address option)                                                                                                                                                                                                                                                                    |
| `track_login_ip_address`     | true              | Track login attempts by IP Address, if FALSE will track based on identity                                                                                                                                                                                                                                                                                            |
| `maximum_login_attempts`     | 3                 | Set the maximum number of failed login attempts. This maximum is not enforced by the library, but is used by $this->ion_auth->is_max_login_attempts_exceeded(). The controller should check this function and act appropriately. If set to 0, there is no maximum                                                                                                    |
| `forgot_password_expiration` | 1800              | Number of seconds before a forgot password request expires. If set to 0, requests will not expire. 30 minutes to 1 hour are good values (enough for a user to receive the email and reset its password). You should not set a value too high (or 0), as it could lead to security issue!                                                                             |
| `recheck_timer`              | 0                 | The number of seconds after which the session is checked again against database to see if the user still exists and is active. Leave 0 if you don't want session recheck. if you really think you need to recheck the session against database, we would recommend a higher value, as this would affect performance                                                  |

#### Cookie options

| option                 | Default       | Description                               |
| ---------------------- | ------------- | ----------------------------------------- |
| `remember_cookie_name` | remember_code | Cookie name for the "Remember me" feature |

#### Email options

| option       | Default | Description        |
| ------------ | ------- | ------------------ |
| `email_type` | html    | Email content type |

#### Templates options

| option                  | Default                 | Description                                        |
| ----------------------- | ----------------------- | -------------------------------------------------- |
| `email_templates`       | auth/email/             | Folder where the email view templates are stored   |
| `email_activate`        | activate.tpl.php        | Filname of the email activation view template      |
| `email_forgot_password` | forgot_password.tpl.php | Filname of the forgot password email view template |

#### Message Delimiters

| Option                    | Default | Description                     |
| ------------------------- | ------- | ------------------------------- |
| `message_start_delimiter` | &lt;p>  | Starting delimiter for messages |
| `message_end_delimiter`   | &lt;/p> | Ending delimiter for messages   |
| `error_start_delimiter`   | &lt;p>  | Starting delimiter for errors   |
| `error_end_delimiter`     | &lt;/p> | Ending delimiter for errors     |

## Class Function Reference

<alert>

NOTE: Methods available in the model are called through the controller using
PHP5 magic. You should never use ion_auth_model->method() in your applications.

</alert>

### `login()`

Logs the user into the system.

Parameters

| Parameter   | Type    |          | Description                                                                              |
| ----------- | ------- | -------- | ---------------------------------------------------------------------------------------- |
| `$identity` | string  | REQUIRED | Username, email or any unique value in your users table, depending on your configuration |
| `$password` | string  | REQUIRED |                                                                                          |
| `$remember` | boolean | OPTIONAL | TRUE sets the user to be remembered if enabled in the configuration                      |

Return

boolean. TRUE if the user was successfully logged in FALSE if the user was not
logged in.

Usage

```php
$identity = 'ben.edmunds@gmail.com';
$password = '12345678';
$remember = TRUE; // remember the user
$this->ion_auth->login($identity, $password, $remember);
```

### `logout()`

Logs the user out of the system.

Usage

```php
$this->ion_auth->logout();
```

### `register()`

Register (create) a new user.

Parameters

- `$identity` - string REQUIRED. This must be the value that uniquely identifies
  the user when he is registered. If you chose "email" as `$config['identity']`
  in the configuration file, you must put the email of the new user.
- `$password` - string REQUIRED.
- `$email` - string REQUIRED.
- '$additional_data' - multidimensional array OPTIONAL.
- `$group` - array OPTIONAL. If not passed the default group name set in the
  config will be used.

Return

mixed. The ID of the user if the user was successfully created, FALSE if the
user was not created.

Usage

```php
$username = 'benedmunds';
$password = '12345678';
$email = 'ben.edmunds@gmail.com';
$additional_data = [
    'first_name' => 'Ben',
    'last_name' => 'Edmunds',
];
$group = array('1'); // Sets user to admin.

$this->ion_auth->register($username, $password, $email, $additional_data, $group)
```

### `create_user()`

create_user is an alternate method for register() method.

### `update()`

Update a user.

Parameters

- `$id` - integer REQUIRED.
- `$data` - multidimensional array REQUIRED.

Return

boolean. TRUE if the user was successfully updated FALSE if the user was not
updated.

Usage

```php
$id = 12;
$data = [
    'first_name' => 'Ben',
    'last_name' => 'Edmunds',
    'password' => '123456789',
];
$this->ion_auth->update($id, $data)
```

### `update_user()`

update_user() is an alternate method for `update()` method.

### `delete_user()`

Delete a user.

Parameters

`$id` - integer REQUIRED.

Return

boolean. TRUE if the user was successfully deleted FALSE if the user was not
deleted.

Usage

```php
$id = 12;
$this->ion_auth->delete_user($id);
```

### `forgotten_password()`

Resets a users password by emailing the user a reset code.

Parameters

`$identity` - string REQUIRED. (as defined in config/ion_auth.php)

Return

boolean. TRUE if the users password was successfully reset FALSE if the users
password was not reset.

Usage

- this example assumes you have 'email' selected as the identity in
  config/ion_auth.php

```php
// Working code for this example is in the example Auth controller in the github repo
function forgot_password()
{
    $this->form_validation->set_rules('email', 'Email Address', 'required');
    if ($this->form_validation->run() == false) {
        // setup the input
        $this->data['email'] = [
            'name' => 'email',
            'id' => 'email',
        ];
        // set any errors and display the form
        $this->data['message'] = (validation_errors()) ? validation_errors() : $this->session->flashdata('message');
        $this->load->view('auth/forgot_password', $this->data);
    } else {
        // run the forgotten password method to email an activation code to the user
        $forgotten = $this->ion_auth->forgotten_password($this->input->post('email'));

        if ($forgotten) { // if there were no errors
            $this->session->set_flashdata('message', $this->ion_auth->messages());
            redirect("auth/login", 'refresh'); // we should display a confirmation page here instead of the login page
        } else {
            $this->session->set_flashdata('message', $this->ion_auth->errors());
            redirect("auth/forgot_password", 'refresh');
        }
    }
}
```

### `forgotten_password_check()`

Check to see if the forgotten password code is valid.

Parameters

`$code` - string REQUIRED.

Return

object / bool. Returns the user record if valid, return FALSE if invalid.

Usage

```php
$user = $this->ion_auth->forgotten_password_check($code);
if ($user) {
    // display the password reset form
}
```

### `logged_in()`

Check to see if a user is logged in.

Return

boolean. TRUE if the user is logged in FALSE if the user is not logged in.

Usage

```php
if (! $this->ion_auth->logged_in()) {
    redirect('auth/login');
}
```

### `is_admin()`

Check to see if the currently logged in user is an admin.

Parameters

`$id` - integer OPTIONAL. If a user id is not passed the id of the currently
logged in user will be used.

Return

boolean. TRUE if the user is an admin FALSE if the user is not an admin.

Usage

```php
if (! $this->ion_auth->is_admin()) {
    $this->session->set_flashdata('message', 'You must be an admin to view this page');
    redirect('welcome/index');
}
```

### `in_group()`

Check to see if a user is in a group(s).

Parameters

- 'Group ID or Name' - string REQUIRED. Integer or array of strings and
  integers.
- 'User ID' - integer OPTIONAL. If a user id is not passed the id of the
  currently logged in user will be used.
- 'Check All' - bool OPTIONAL. Whether to check if user is in all groups, or in
  any group.

Return

boolean. TRUE if the user is in all or any (based on passed param), FALSE
otherwise.

Usage

```php
# single group (by name)
$group = 'gangstas';
if (! $this->ion_auth->in_group($group)) {
    $this->session->set_flashdata('message', 'You must be a gangsta to view this page');
    redirect('welcome/index');
}

# single group (by id)
$group = 1;
if (! $this->ion_auth->in_group($group)) {
    $this->session->set_flashdata('message', 'You must be part of the group 1 to view this page');
    redirect('welcome/index');
}

# multiple groups (by name)
$group = array('gangstas', 'hoodrats');
if (! $this->ion_auth->in_group($group))
    $this->session->set_flashdata('message', 'You must be a gangsta OR a hoodrat to view this page');
    redirect('welcome/index');
}

# multiple groups (by id)
$group = array(1, 2);
if (! $this->ion_auth->in_group($group))
    $this->session->set_flashdata('message', 'You must be a part of group 1 or 2 to view this page');
    redirect('welcome/index');
}

# multiple groups (by id and name)
$group = array('gangstas', 2);
if (! $this->ion_auth->in_group($group))
    $this->session->set_flashdata('message', 'You must be a part of the gangstas or group 2');
    redirect('welcome/index');
}
å
# multiple groups (by id) and check if all exist
$group = array(1, 2);
if (! $this->ion_auth->in_group($group, false, true))
    $this->session->set_flashdata('message', 'You must be a part of group 1 and 2 to view this page');
    redirect('welcome/index');
}
```

### `username_check()`

Check to see if the username is already registered.

Parameters

`$username` - string REQUIRED.

Return

boolean. TRUE if the user is registered FALSE if the user is not registered.

Usage

```php
// This is a lame example but it works.  Usually you would use this method with form_validation.
$username = $this->input->post('username');
$password = $this->input->post('password');
$email = $this->input->post('email');
$additional_data = [
    'first_name' => $this->input->post('first_name'),
    'last_name' => $this->input->post('last_name'),
];

if (! $this->ion_auth->username_check($username)) {
    $group_name = 'users';
    $this->ion_auth->register($username, $password, $email, $additional_data, $group_name)
}
```

### `email_check()`

Check to see if the email is already registered.

Parameters

`$email` - string REQUIRED.

Return

boolean. TRUE if the user is registered FALSE if the user is not registered.

Usage

```php
// This is a lame example but it works.  Usually you would use this method with form_validation.
$username = $this->input->post('username');
$password = $this->input->post('password');
$email = $this->input->post('email');
$additional_data = [
    'first_name' => $this->input->post('first_name'),
    'last_name' => $this->input->post('last_name'),
];

if (! $this->ion_auth->email_check($email)) {
    $group_name = 'users';
    $this->ion_auth->register($username, $password, $email, $additional_data, $group_name)
}
```

### `identity_check()`

Check to see if the identity is already registered.

Parameters

`$identity` - string REQUIRED.

Return

boolean. TRUE if the user is registered FALSE if the user is not registered.

Usage

```php
// This is a lame example but it works.
$user = $this->ion_auth->user();
$data = [
      'identity' => $this->input->post('identity'),
      'first_name' => $this->input->post('first_name'),
      'last_name' => $this->input->post('last_name'),
];

if ($data['identity'] === $user->username || $data['identity'] === $user->email || $this->ion_auth->identity_check($data['identity']) === FALSE) {
    $this->ion_auth->update_user($user->id, $data)
}
```

### `is_max_login_attempts_exceeded()`

If login attempt tracking is enabled, checks to see if the number of failed
login attempts for this identity or ip address has been exceeded. The controller
must call this method and take any necessary actions. Login attempt limits are
not enforced in the library.

Parameters

`$identity` - string REQUIRED.

Return

boolean. TRUE if maximum_login_attempts is exceeded FALSE if not or if login
attempts not tracked.

Usage

```php
$identity = 'ben.edmunds@gmail.com';

if ($this->ion_auth->is_max_login_attempts_exceeded($identity)) {
    $this->session->set_flashdata('message', 'You have too many login attempts');
    redirect('welcome/index');
}
```

### `get_attempts_num()`

Returns the number of failed login attempts for this identity or ip address.

Parameters

`$identity` - string REQUIRED.

Return

int. The number of failed login attempts for this identity or ip address.

Usage

```php
$identity = 'ben.edmunds@gmail.com';
$num_attempts = $this->ion_auth->get_attempts_num($identity);
```

### `increase_login_attempts()`

If login attempt tracking is enabled, records another failed login attempt for
this identity or ip address. This method is automatically called during the
login() method if the login failed.

Parameters

`$identity` - string REQUIRED.

Usage

```php
$identity = 'ben.edmunds@gmail.com';
$password = '12345678';

if ($this->ion_auth->login($identity, $password) == FALSE) {
    $this->ion_auth->increase_login_attempts($identity)
}
```

### `clear_login_attempts()`

Clears all failed login attempt records for this identity or this ip address.
This method is automatically called during the login() method if the login
succeded.

Parameters

`$identity` - string REQUIRED.

Usage

```php
$identity = 'ben.edmunds@gmail.com';
$password = '12345678';

if ($this->ion_auth->login($identity, $password) == TRUE) {
    $this->ion_auth->clear_login_attempts($identity)
}
```

### `user()`

Get a user.

Parameters

'$id' - integer OPTIONAL. If a user id is not passed the id of the currently
logged in user will be used.

Return

```php
stdClass Object (
    [id] => 1
    [ip_address] => 127.0.0.1
    [username] => administrator
    [password] => 59beecdf7fc966e2f17fd8f65a4a9aeb09d4a3d4
    [email] => admin@admin.com
    [activation_code] => 19e181f2ccc2a7ea58a2c0aa2b69f4355e636ef4
    [forgotten_password_code] => 81dce1d0bc2c10fbdec7a87f1ff299ed7e4c9e4a
    [remember_code] => 9d029802e28cd9c768e8e62277c0df49ec65c48c
    [created_on] => 1268889823
    [last_login] => 1279464628
    [active] => 0
    [first_name] => Admin
    [last_name] => Account
    [company] => Some Corporation
    [phone] => (123)456-7890
)
```

Usage

```php
    $user = $this->ion_auth->user()->row();
    echo $user->email;
```

### `users()`

Get the users.

Parameters

'Group IDs, group names, or group IDs and names' - array OPTIONAL. If an array
of group ids, of group names, or of group ids and names are passed (or a single
group id or name) this will return the users in those groups.

Return

model object

Usage

```php
// get all users
$users = $this->ion_auth->users()->result();
// get users from group with id of '1'
$users = $this->ion_auth->users(1)->result();
// get users from 'members' group
$users = $this->ion_auth->users('members')->result();
// get users from 'admin' and 'members' group
$users = $this->ion_auth->users(array('admin','members'))->result();
// get users from 'admin' group, 'members' group and group with id '4'
$users = $this->ion_auth->users(array('admin',4,'members'))->result();
// get users from group with id of '1'
$users = $this->ion_auth->users(1)->result();
 // get users from 'members' group
$users = $this->ion_auth->users('members')->result();
// get users from 'admin' and 'members' group
$users = $this->ion_auth->users(array('admin','members'))->result();
// get users from 'admin' group, 'members' group and group with id '4'
$users = $this->ion_auth->users(array('admin',4,'members'))->result();
```

### `group()`

Get a group.

Parameters

'$id' - integer REQUIRED.

Return

object

Usage

```php
$group_id = 2;
$group = $this->ion_auth->group($group_id)->result();
```

### `groups()`

Get the groups.

Return

array of objects

Usage

```php
$groups = $this->ion_auth->groups()->result();
```

### `messages()`

Get messages.

Return

string

Usage

```php
$id = 12;
$data = [
    'first_name' => 'Ben',
    'last_name' => 'Edmunds',
];

if ($this->ion_auth->update_user($id, $data)) {
    $messages = $this->ion_auth->messages();
    echo $messages;
} else {
    $errors = $this->ion_auth->errors();
    echo $errors;
}
```

### `messages_array()`

Get messages as an array.

Return

array

Parameters

'Langify' - boolean OPTIONAL. TRUE means that the messages will be langified.

Usage

```php
$id = 12;
$data = [
    'first_name' => 'Ben',
    'last_name' => 'Edmunds',
];

if ($this->ion_auth->update_user($id, $data)) {
    $messages = $this->ion_auth->messages_array();
    foreach ($messages as $message) {
        echo $message;
    }
} else {
    $errors = $this->ion_auth->errors_array();
    foreach ($errors as $error) {
        echo $error;
    }
}
```

### `get_users_groups()`

Get all groups a user is part of.

Parameters

`$id` - integer OPTIONAL. If a user id is not passed the id of the currently
logged in user will be used.

Return

```php
stdClass Object (
    [id] => 1
    [name] => admins
    [description] => Administrator
)`
```

Usage

```php
$user_groups = $this->ion_auth->get_users_groups($user->id)->result();
```

### `add_to_group()`

Add user to group

Parameters

- `$group_id` - integer or array REQUIRED.
- `$user_id` - integer REQUIRED.

Return

boolean. TRUE if the user was added to group(s) FALSE if the user is not added
to group(s).

Usage

```php
// pass an array of group ID's and user ID
$this->ion_auth->add_to_group(['1', '3', '6'], $user_id);

// pass a single ID and user ID
$this->ion_auth->add_to_group(1, $user_id);
```

### `remove_from_group()`

Remove user from group(s)

Parameters

- `$group_id` - NULL, integer or array REQUIRED. NULL will remove the user from
  all groups.
- `$user_id` - integer REQUIRED.

Return

boolean. TRUE if the user was removed from group(s) FALSE if the user is not
removed from group(s).

Usage

```php
// pass an array of group ID's and user ID
$this->ion_auth->remove_from_group(['1', '3', '6'], $user_id);

// pass a single ID and user ID
$this->ion_auth->remove_from_group(1, $user_id);

// pass NULL to remove user from all groups
$this->ion_auth->remove_from_group(NULL, $user_id);
```

### `create_group()`

Create a group

Parameters

- $group_name` - string REQUIRED.
- $group_description` - string.

Return

brand new group_id if the group was created, FALSE if the group creation failed.

Usage

```php
// pass the right arguments and it's done
$group = $this->ion_auth->create_group('new_test_group', 'This is a test description');

if(! $group) {
    $view_errors = $this->ion_auth->messages();
} else {
    $new_group_id = $group;
    // do more cool stuff
}
```

### `update_group()`

Update details of a group

Parameters

- `$group_id` - int REQUIRED.
- `$group_name` - string REQUIRED.
- `$additional_data` - array.

Return

boolean. TRUE if the group was updated, FALSE if the update failed.

Usage

```php
// source these things from anywhere you like (eg., a form)
$group_id = 2;
$group_name = 'test_group_changed_name';
$additional_data = [
    'description' => 'New Description'
];

// pass the right arguments and it's done
$group_update = $this->ion_auth->update_group(
    $group_id,
    $group_name,
    $additional_data
);

if(! $group_update) {
    $view_errors = $this->ion_auth->messages();
} else {
    // do more cool stuff
}
```

### `delete_group()`

Remove a group. Removes the group details from the configured 'groups' table.
Users belonging to the group are stripped of this status (references to this
group are removed from users_groups), but user data itself remains untouched.

Parameters

`$group_id` - int REQUIRED.

Return

boolean. TRUE if the group was deleted, FALSE if the delete failed.

Usage

```php
// source this from anywhere you like (eg., a form)
$group_id = 2;

// pass the right arguments and it's done
$group_delete = $this->ion_auth->delete_group($group_id);

if(! $group_delete) {
    $view_errors = $this->ion_auth->messages();
} else {
    // do more cool stuff
}
```

### `set_message_delimiters()`

Set the message delimiters.

Parameters

- 'Start Delimiter' - string REQUIRED.
- 'End Delimiter' - string REQUIRED.

Usage

```php
$id = 12;
$data = [
    'first_name' => 'Ben',
    'last_name' => 'Edmunds',
];

if ($this->ion_auth->update_user($id, $data)) {
    $this->ion_auth->set_message_delimiters('<p><strong>','</strong></p>');
    $messages = $this->ion_auth->messages();
    echo $messages;
} else {
    $this->ion_auth->set_error_delimiters('<p><strong>','</strong></p>');
    $errors = $this->ion_auth->errors();
    echo $errors;
}
```

### `errors()`

Get the errors.

Return

string

Usage

```php
$id = 12;
$data = [
      'first_name' => 'Ben',
      'last_name' => 'Edmunds',
];

if ($this->ion_auth->update_user($id, $data)) {
    $messages = $this->ion_auth->messages();
    echo $messages;
} else {
    $errors = $this->ion_auth->errors();
    echo $errors;
}
```

### `errors_array()`

Get error messages as an array.

Return

array

Parameters

'Langify' - boolean OPTIONAL. TRUE means that the error messages will be
langified.

Usage

```php
$id = 12;
$data = [
    'first_name' => 'Ben',
    'last_name' => 'Edmunds',
];

if ($this->ion_auth->update_user($id, $data)) {
    $messages = $this->ion_auth->messages_array();
    foreach ($messages as $message) {
        echo $message;
    }
} else {
    $errors = $this->ion_auth->errors_array();
    foreach ($errors as $error) {
        echo $error;
    }
}
```

### `set_error_delimiters()`

Set the error delimiters.

Parameters

- 'Start Delimiter' - string REQUIRED.
- 'End Delimiter' - string REQUIRED.

Usage

```php
$id = 12;
$data = [
    'first_name' => 'Ben',
    'last_name' => 'Edmunds',
];

if ($this->ion_auth->update_user($id, $data)) {
  $this->ion_auth->set_message_delimiters('<p><strong>','</strong></p>');
  $messages = $this->ion_auth->messages();
  echo $messages;
} else {
  $this->ion_auth->set_error_delimiters('<p><strong>','</strong></p>');
  $errors = $this->ion_auth->errors();
  echo $errors;
}
```

### `set_hook()`

Set a single or multiple functions to be called when trigged by
trigger_events(). See an example here:
https://gist.github.com/657de89b26decda2b2fa

Parameters

- `$event` - string REQUIRED.
- `$name` - string REQUIRED.
- `$class` - string REQUIRED.
- `$method` - string REQUIRED.
- `$arguments` - Array OPTIONAL.

Usage

```php
class Accounts extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        /*
          make sure we loaded ion_auth2
          The following does not need to go in __construct() it just needs to be set before
          you trigger_events().
        */
        $event = 'socialpush';
        $class = 'Accounts';
        $args = ['this is the content of the message', 'billy'];

        $name = 'activate_sendmail';
        $method = 'email';
        $this->ion_auth->set_hook($event, $name, $class, $method, $args);
        $name = 'call_Twitter';
        $method = 'twitter';
        $this->ion_auth->set_hook($event, $name, $class, $method, $args);
        $name = 'call_MailChimp_API';
        $method = 'mailchimp';
        $this->ion_auth->set_hook($event, $name, $class, $method, $args);
        $name = 'call_Facebook_API';
        $method = 'facebook';
        $this->ion_auth->set_hook($event, $name, $class, $method, $args);
        $name = 'call_gPlus_API';
        $method = 'gplus';
        $this->ion_auth->set_hook($event, $name, $class, $method, $args);
    }

    public function Post_Message($one)
    {
        $this->ion_auth->trigger_events('socialpush');
    }

    public function email($content, $who)
    {
        return true;
    }

    public function twitter($content, $who)
    {
        return true;
    }

    public function mailchimp($content, $who)
    {
        return true;
    }

    public function facebook($content, $who)
    {
        return true;
    }

    public function gplus($content, $who)
    {
        return true;
    }
}
```

### `trigger_events()`

Call Additional functions to run that were registered with set_hook().

Parameters

'Name' - String or Array REQUIRED.

Usage

```php
$this->ion_auth->trigger_events('socialpush');
```

## CodeIgniter-MY_Model

This **CodeIgniter MY_Model** is the result of a lengthy tutorial about
constructing a **MY_Model** in CodeIgniter
(http://avenir.ro/revisiting-my_model-copying-jamie-rumbelow-looking-eloquent/).
It's based on **Jamie Rumbelow's Base Model**
(https://github.com/jamierumbelow/codeigniter-base-model), but with some
changed/added methods. It provides a full CRUD base for database interactions,
as well as an event-based observer system, intelligent table name guessing and
soft delete.

**VERY IMPORTANT NOTE: MY_Model DOESN'T REPLACE THE QUERY BUILDER. IF YOU HAVE A
VERY COMPLEX QUERY, DO NOT ASK MY_Model TO DO IT FOR YOU**

### Table of contents

- [Synopsis](#synopsis)
- [Installation/Usage](#installationusage)
- [CREATE](#create)
- [READ](#read)
- [Pagination](#pagination)
- [UPDATE](#update)
- [DELETE](#delete)
- [Relationships](#relationships)
- [Working with relationships](#working-with-relationships)
- [Database Connection](#database-connection)
- [Observers](#observers)
- [Available methods](#available-methods)

### Synopsis

```php
class User_model extends MY_Model { }

$this->load->model('user_model');

$this->user_model->get(1)

$this->user_model->get_all();

$this->user_model->where('username','avenirer')->get();

$this->user_model->insert(array('username' => 'avenirer','email' => 'avenir.ro@gmail.com'));

$this->user_model->update(array('status' => '0'), 1);

$this->user_model->delete(1);
```

### Installation/Usage

Download and drag the **MY_Model.php** file into your **application/core**
directory. CodeIgniter will load and initialise this class automatically.

Extend your model classes from MY_Model and all the functionality will be baked
in automatically.

```php
class User_model extends MY_Model
{
	public $table = 'users'; // you MUST mention the table name
	public $primary_key = 'id'; // you MUST mention the primary key
	public $fillable = array(); // If you want, you can set an array with the fields that can be filled by insert/update
	public $protected = array(); // ...Or you can set an array with the fields that cannot be filled by insert/update
	public function __construct()
	{
		parent::__construct();
	}
}
```

If extended like that, MY_Model makes the following assumptions:

- there are **at least a "created_at" and "updated_at" columns**. wh If you
  want, you can be original by changing the settings before the
  `parent::__construct();`

```php
class User_model extends MY_Model
{
	public function __construct()
	{

		// you can set the database connection that you want to use for this particular model, by passing the group connection name or a config array. By default will use the default connection
		$this->_database_connection  = 'special_connection';

		// you can disable the use of timestamps. This way, MY_Model won't try to set a created_at and updated_at value on create methods. Also, if you pass it an array as calue, it tells MY_Model, that the first element is a created_at field type, the second element is a updated_at field type (and the third element is a deleted_at field type if $this->soft_deletes is set to TRUE)
		$this->timestamps = TRUE

		// you can enable (TRUE) or disable (FALSE) the "soft delete" on records. Default is FALSE, which means that when you delete a row, that one is gone forever
        	$this->soft_deletes = FALSE

        	// you can set how the model returns you the result: as 'array' or as 'object'. the default value is 'object'
		$this->return_as = 'object' | 'array'

		// you can set relationships between tables

		//$this->has_one['...'] allows establishing ONE TO ONE or more ONE TO ONE relationship(s) between models/tables
		$this->has_one['phone'] = 'Phone_model';
		// or $this->has_one['phone'] = array('Phone_model','foreign_key','local_key');
		$this->has_one['address'] = 'Address_model';
		// or $this->has_one['address'] = array('Address_model','foreign_key','another_local_key');

		// $this->has_many[''...] allows establishing ONE TO MANY or more ONE TO MANY relationship(s) between models/tables
		$this->has_many['posts'] = 'Post_model';
		// or $this->has_many['posts'] = array('Posts_model','foreign_key','another_local_key');

		// $this->has_many_pivot['...'] allows establishing MANY TO MANY or more MANY TO MANY relationship(s) between models/tables with the use of a PIVOT TABLE
		$this->has_many_pivot['posts'] = 'Post_model';
		// or $this->has_many_pivot['posts'] = array('Posts_model','foreign_primary_key','local_primary_key');

		// ATTENTION! The pivot table name must be composed of the two table names separated by "_" the table names having to to be alphabetically ordered (NOT users_posts, but posts_users).
		// Also the pivot table must contain as identifying columns the columns named by convention as follows: table_name_singular + _ + foreign_table_primary_key.
		// For example: considering that a post can have multiple authors, a pivot table that connects two tables (users and posts) must be named posts_users and must have post_id and user_id as identifying columns for the posts.id and users.id tables.

		// you can also use caching. If you want to use the set_cache('...') method, but you want to change the way the caching is made you can use the following properties:

		$this->cache_driver = 'file';
		//By default, MY_Model uses the files (CodeIgniter's file driver) to cache result. If you want to change the way it stores the cache, you can change the $cache_driver property to whatever CodeIgniter cache driver you want to use.

		$this->cache_prefix = 'mm';
		//With $cache_prefix, you can prefix the name of the caches. By default any cache made by MY_Model starts with 'mm' + _ + "name chosen for cache"

		parent::__construct();
 	}
}
```

### CREATE

#### Inserting values

You can insert values by using the **insert()** method, passing it an array or
an object as parameter. You can also insert multiple rows of data by using a
multidimensional array.

```php
<?php
$insert_data = array('username'=>'avenirer','email'=>'email@email.com');
$this->load->model('user_model');
$this->user_model->insert($insert_data);
?>
```

#### Inserting directly from forms with form validation

You can at any time directly insert values from forms into the tables using the
**from_form()** method. First of all **make sure you have a fillable or a
protected property (at least the primary key should be in there)**, because you
must make sure no-one interferes with your id's or whatever you use to uniquely
identify the rows. Also is worth noting that, because the inserts and updates
from forms are done directly without intervention from developer, **YOU MUST
DEFINE VALIDATION RULES FOR ALL FIELDS THAT YOU ARE FILLING**

After you've done this, you must set the rules. If you use the MY_Model's form
validation, I advise you to write the rules inside your model. This even allows
you to specify separate rules for each action (i.e. insert and update) by using
an associative array with keys according to the action. If the same ruleset
should apply to all actions, just use an sequential array. Below you can find an
example of model:

```php
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends MY_Model
{
    //public $soft_deletes = TRUE;
    public $has_one = array('phone' => 'Phone_model', 'address' => array('Address_model','user_id','id'));
    public $has_many_pivot = array('posts' => array('Post_model','id','user_id'));
    public $timestamps = FALSE;
	public $protected = array('id');

    function __construct()
    {
        parent::__construct();
    }

    public $rules = array(
            'insert' => array(

                    'username' => array(
                            'field'=>'username',
                            'label'=>'Username',
                            'rules'=>'trim|required'),

                    'email' => array(
                            'field'=>'email',
                            'label'=>'Email',
                            'rules'=>'trim|valid_email|required',
                            'errors' => array ('required' => 'Error Message rule "required" for field email',
                                    'trim' = > 'Error message for rule "trim" for field email',
                                    'valid_email' = > 'Error message for rule "valid_email" for field email')
                    ),
            'update' => array(
                    'username' => array(
                            'field'=>'username',
                            'label'=>'Username',
                            'rules'=>'trim|required'),

                    'email' => array(
                            'field'=>'email',
                            'label'=>'Email',
                            'rules'=>'trim|valid_email|required',
                            'errors' => array ('required' => 'Error Message rule "required" for field email',
                                    'trim' = > 'Error message for rule "trim" for field email',
                                    'valid_email' = > 'Error message for rule "valid_email" for field email')
                    ),
                    'id' => array(
                            'field'=>'id',
                            'label'=>'ID',
                            'rules'=>'trim|is_natural_no_zero|required'),
            )
    );
}
```

After setting the model this way, you are ready to go. So, in your controller
you can go like this:

```php
public function add_user()
{
	$this->load->model('user_model');
	$id = $this->user_model->from_form()->insert();
	if($id === FALSE)
	{
		$this->load->view('user_form_view');
	}
	else
	{
		echo  $id;
		//...whatever you want to do. the form was submitted and the data was inserted
	}
}
```

If you have any doubts, this is how the view looks:

```php
<?php

echo form_open();
echo form_label('Username','username').':<br />';
echo form_error('username');
echo form_input('username',set_value('username')).'<br />';

echo form_label('Email','email').':<br />';
echo form_error('email');
echo form_input('email',set_value('email'));

echo form_submit('submit','Save user');
echo form_close();
```

You can add additional values into database, values that are not taken from the
form fields, by adding a second paramenter to the from_form() method:

```php
<?php
...
$id = $this->user_model->from_form(NULL,array('created_by'=>'1'))->insert();
...
```

### READ

#### Arrays vs Objects

By default, MY_Model is setup to return objects. If you'd like to return results
as array you can:

- either define `$this->return_as = 'array'` in the constructor
- or add `as_array()` into the query chain:

```php
$users = $this->user_model->as_array()->get_all(); $posts = $this->post_model->as_object()->get_all();
```

If you'd like all your calls to use the array methods, you can set the
$return_type variable to array.

#### Return as dropdown

There are moments when you need to retrieve data to fill a select input type.
For this we have a method called as_dropdown($field). This method will return an
array having the primary keys as array keys and a $field as values:

```php
$categories = $this->category_model->as_dropdown('title')->get_all();
echo form_dropdown($categories);
```

#### Caching

If you want to cache the result for faster output, you can at any time use the
MY_Model's caching. To do this you simply attach a set_cache('name') inside the
query chain:

```php
$this->load->model('user_model');
$users = $this->user_model->as_array()->set_cache('get_all_users')->get_all();
```

The code above will create a cache file named mm_users_get_all_users. If you
want the cache to have a time limit, you can pass a second parameter that
represents the number of seconds:

```php
$users = $this->user_model->as_array()->set_cache('get_all_users',3600)->get_all();
```

This file will then be used by the model whenever you call the get_all() method
that has a set_cache('get_all_users') method in the chain.

Whenever you want, you can delete the cache "manually" by using the
delete_cache() method.

There are three ways you can delete the cache:

- `delete_cache('get_all_users')` deletes a certain cache;
- `delete_cache('*')` deletes the caches that start with 'mm*users*' (where
  'mm_users' is the prefix used by MY_Model in conjuction with your model's
  table name);
- `delete_cache()` deletes all cache that start with 'mm*' (where 'mm*' is the
  prefix used by MY_Model).

Example:

```php
$this->user_model->delete_cache('get_all_users');
```

##### Auto-delete caching

You can set the model in a way so that the cache will be deleted automatically
whenever you write/update/delete data from your model's table. This way you
won't need to do it manually. You can have this enabled by setting the
delete_cache_on_save property to TRUE in the constructor:

```php
class User_model extends MY_Model
{
    //public $soft_deletes = TRUE;
    public $delete_cache_on_save = TRUE;

    function __construct()
    {
        parent::__construct();
    }
    ...
```

### Pagination

You can at any time "paginate" the results. You can do this by simply changing
`get_all()` method with `paginate()` method. The paginate() method can receive
up to three parameters:

- first paramater, which is optional (default is set to 10) is the number of
  rows per page;
- second parameter, which is optional (default is set to NULL), is the total of
  rows;
- the third parameter, which is also optional (default is set to 1) is the page
  you want to get.

If you only passed the first parameter, the page number will be retrieved from
the URL (the last segment of the page). If you didn't pass the second parameter
you will only be able to output the previous and next page, without links to all
the pages.

Examples:

```php
$total_posts = $this->post_model->count_rows(); // retrieve the total number of posts
$posts = $this->post_model->paginate(10,$total_posts); // paginate with 10 rows per page
echo $this->post_model->all_pages; // will output links to all pages like this model: "< 1 2 3 4 5 >". It will put a link if the page number is not the "current page"
echo $this->post_model->previous_page; // will output link to the previous page like this model: "<". It will only put a link if there is a "previous page"
echo $this->post_model->next_page; // will output link to the next page like this model: ">". It will only put a link if there is a "next page"
```

Don't you like how the links look? You can change them by modifing the following
properties inside the models that extend the MY_Model():

```php
$this->pagination_delimiters = array('<span>','</span>');
$this->pagination_arrows = array('&lt;','&gt;');
```

Also, you can use the
set_pagination_delimiters($delimiters) and set_pagination_arrows($arrows)
methods, where $delimiters and $arrows are arrays.

### UPDATE

#### The update() method

##### The basic update()

The update() method is pretty much the same as the insert() method.

To update some values you must pass an array with the columns as keys and their
respective values as values of array. The second parameter can be either the id
of the row or the column name used to identify the row:

Update using row id:

```php
<?php
$update_data = array('username'=>'avenirer','email'=>'email@email.com');
$this->load->model('user_model');
$this->user_model->update($update_data,2);
?>
```

Update using column name:

```php
<?php
$update_data = array('username'=>'avenirer','email'=>'email@email.com', 'id'=>'2');
$this->load->model('user_model');
$this->user_model->update($update_data,'email');
?>
```

You can also pass a multidimensional array to change multiple rows. In this case
the second parameter should be the name of the identifying column.

##### Update using the where() method

Another method to do an update would be to use the update() method in conjuction
with the where() method:

```php
<?php
$update_data = array('username'=>'avenirer','email'=>'email@email.com');
$this->load->model('user_model');
$this->user_model->where('email','email@email.com')->update($update_data);
?>
```

##### Update directly from form using from_form() method

The update can also be made directly from the form with validation, the same way
as is done by the insert() method. The only difference would be that you need to
specify which input field should be used as reference for the rows to be
updated. You do this by passing a third parameter as array:

```php
$this->user_model->from_form(NULL,NULL,array('user_id'))->update(); // where user_id is an input element
```

Also, if you want to reference the field with a direct value that doesn't exist
within the form, then you can assign it within the array too.

```php
$this->user_model->from_form(NULL,NULL,array('user_id' => 1))->update(); // where user_id is referenced directly
```

If you need to use another table field that is not in the form, in order to
identify the row, you can pass it to the from_form() method as a second
parameter:

```php
$id = $this->user_model->from_form(NULL,array('created_by'=>'1'), array('user_id'))->update();
```

##### Update custom string with disabled escaping

You can prevent escaping content by passing an optional third argument, and
setting it to FALSE (the second parameter is a where condition set as an array -
you can set it to NULL):

```php
$this->user_model->update(array('views'=>'views+1'), array('id'=>'1'), FALSE);
```

**TAKE CARE:** This doesn't work with values that have space inside unless you
set quotes on them. So I would rather not use this (Maybe in future I will
change the way this works)

### DELETE

#### The delete() method

#### Soft Deletes

By default, the delete mechanism works with an SQL DELETE statement. However,
you might not want to destroy the data, you might instead want to perform a
**'soft delete'**.

If you enable soft deleting, the **deleted_at** row will be filled with the
current date and time, rather than actually being removed from the database.

You can enable soft delete in the constructor:

```php
$this->soft_deletes = TRUE;
```

Once you've enabled it whenever you do, for example, a
`$this->user_model->delete(3);` the **delete()** method will only create a
datetime in the **deleted_at** column of the user with id 3.

If you really want to delete a row you can use `force_delete()` method:

```php
$this->user_model->force_delete(6);
```

You can also restore or "un-delete" a row by using the `restore()` method:

```php
$this->user_model->restore(3)
```

This will set to **NULL** the **deleted_at** value.

Once you soft delete a row, that row won't appear in read results unless
expressely asked to:

For this, you have the following methods:

- `with_trashed()` - will show all rows, including those that were soft deleted
- `only_trashed()` - will show only the rows that were soft deleted

You can also check if a row is **soft_deleted** by using `trashed()` method:

```php
$this->user_model->trashed(3); // will return TRUE or FALSE
```

#### The observers for the delete() method

The before_soft_delete and before_delete observers offer the ID's of the rows
that are about to be (soft) deleted. At the end of the callback you should
return the array of ID's.

The after_soft_delete and after_delete are also returning the ID's of the rows
that you wanted deleted (Not those that have been deleted, so take care...). The
one difference is that the array will also contain a key named "affected_rows"
that will have the number of affected rows as value.

### Relationships

#### Creating relationships

When you extend MY_Model, you can also setup relationships between the model and
other models. There are multiple ways of creating relations between tables:

##### The right way

Before `parent::__construct();` you add:

```php
$this->has_one['phone'] = array('foreign_model'=>'Phone_model','foreign_table'=>'phones','foreign_key'=>'user_id','local_key'=>'id');
```

##### The semi-fast way

In the semi-fast way, you can simply pass the model, the foreign key and the
local key (mind the order). The table name will be taken from the related model:

```php
$this->has_one['phone'] = array('Phone_model','foreign_key','local_key');
```

##### The fast and dirty way

The fast and dirty way will simply need the related model name. All else will be
taken from the model (I wouldn't advise this solution)

```php
$this->has_one['address'] = 'Address_model';
```

#### Has One (one to one) relationship (property)

Has One relationship tells our model that ever record in the table has assigned
to it a record in another table. It is my opinion that there is no need to do a
reverse relation like in Eloquent, where there is a "belongs to" relationship
because, the truth be told, being a "one to one" relationship it's an equality
between the entities.

We can define a "one to one" relationship by using the has_one property inside
the constructor:

```php
class User_model extends MY_Model
{

	function __construct()
	{
		$this->has_one['phone'] = array('foreign_model'=>'Phone_model','foreign_table'=>'phones','foreign_key'=>'user_id','local_key'=>'id');
	}
 }
```

The reverse of the relationship is defined taking care of the foreign key and
local key:

```php
class Phone_model extends MY_Model
{

	function __construct()
	{
		$this->has_one['user'] = array('foreign_model'=>'User_model','foreign_table'=>'users','foreign_key'=>'id','local_key'=>'user_id');
	}
}
```

#### Has Many relationship (property)

Has Many relationship tells our model that a record in the table can have many
related records in another table. The reverse of this relationship is a has one
relation, which translates into a One To Many type of relationship. For a
reverse relationship of type Many To Many, we will have another property named
Has Many Pivot.

```php
class User_model extends MY_Model
{

	function __construct()
	{
		$this->has_many['posts'] = array('foreign_model'=>'Post_model','foreign_table'=>'posts','foreign_key'=>'author_id','local_key'=>'id');
	}
 }
```

The reverse of the relationship (which in this case is a one to one) is defined
the same:

```php
class Post_model extends MY_Model
{

	function __construct()
	{
		$this->has_one['user'] = array('foreign_model'=>'User_model','foreign_table'=>'users','foreign_key'=>'id','local_key'=>'user_id');
	}
}
```

#### Has Many Pivot relationship (property)

Many to many relationship can have one to one as reverse relationship. But there
are also many to many relationships that have many to many as reverse
relationships. For this we have has_many_pivot key as relation. This one allows
establishing MANY TO MANY or more MANY TO MANY relationship(s) between
models/tables with the use of a PIVOT TABLE.

##### Setting up a Has Many Pivot relationship THE RIGHT WAY

For the MY_Model to work properly every single time, you must provide it every
single detail:

```php
class User_model extends MY_Model
{

	function __construct()
	{
		$this->has_many_pivot['posts'] = array(
		    'foreign_model'=>'Post_model',
		    'pivot_table'=>'posts_users',
		    'local_key'=>'id',
		    'pivot_local_key'=>'user_id', /* this is the related key in the pivot table to the local key
		        this is an optional key, but if your column name inside the pivot table
		        doesn't respect the format of "singularlocaltable_primarykey", then you must set it. In the next title
		        you will see how a pivot table should be set, if you want to  skip these keys */
		    'pivot_foreign_key'=>'post_id', /* this is also optional, the same as above, but for foreign table's keys */
		    'foreign_key'=>'id',
		    'get_relate'=>FALSE /* another optional setting, which is explained below */
		);
	}
 }
```

##### Setting up a Has Many Pivot relationship THE FAST AND PRONE TO ERRORS WAY.

**ATTENTION**: The pivot table name must be composed of the two connected table
names separated by _ (underscore) the table names having to be alphabetically
ordered (NOT users_posts, but posts_users). Also the pivot table must contain as
identifying columns the columns named by convention as follows:
foreign_table_name_singular + _ (underscore) + foreign_table_primary_key.

For example: considering that a post can have multiple authors, a pivot table
that connects the two tables (**users** and **posts**) must be named
**posts_users** (**NOT users_posts**) and must have **post_id** and **user_id**
as identifying columns for the **posts.id** and **users.id** tables.

Usage example:

```php
class User_model extends MY_Model
{

	function __construct()
	{
		$this->has_many_pivot['posts'] = 'Post_model';
		// or $this->has_many_pivot['posts'] = array('Post_model','id','id'); where the second parameter is the foreign primary key of posts table, and the third parameter is the local primary key.
	}
 }
```

The reverse of the relationship (which in this case is also a many to many) is
defined the same:

```php
class Post_model extends MY_Model
{

	function __construct()
	{
		$this->has_many_pivot['users'] = 'User_model';
		// or $this->has_many_pivot['users'] = array('User_model','id','id'); where the second parameter is the foreign primary key of users table, and the third parameter is the local primary key.
	}
}
```

##### Get relation data on many to many relationship

You get data only related key ids on many to many relationships. If you set as
TRUE 4th parameter, you will get related data not only keys.

For this you only have to add another key named 'get_relate' and set it to true:

```php
class Posts_Model extends MY_Model
{
    public $table = 'posts';
    public has_many_pivot['posts'] = array(
           		    'foreign_model'=>'Post_model',
           		    'pivot_table'=>'posts_users',
           		    'local_key'=>'id',
           		    'pivot_local_key'=>'user_id', /* this is the related key in the pivot table to the local key
           		        this is an optional key, but if your column name inside the pivot table
           		        doesn't respect the format of "singularlocaltable_primarykey", then you must set it. In the next title
           		        you will see how a pivot table should be set, if you want to  skip these keys */
           		    'pivot_foreign_key'=>'post_id', /* this is also optional, the same as above, but for foreign table's keys */
           		    'foreign_key'=>'id',
           		    'get_relate'=>FALSE /* another optional setting, which is explained below */
           		);
}
```

### Working with relationships

Every table has a way to interact with other tables. So if your model has
relationships with other models, you can define those relationships:

```php
class User_model extends MY_Model
{

    function __construct()
    {
        $this->has_one['phone'] = 'Phone_model';
        $this->has_one['address'] = array('Address_model','user_id','id');
        $this->has_many['posts'] = 'Post_model';
        parent::__construct();
    }
}
```

You can then access your related data using the `with_*()` method:

```php
$user = $this->user_model->with_phone()->with_posts()->get(1);
```

The `with_*()` method can accept parameters like 'fields', 'where', and
'non_exclusive_where'.

With the `fields:...` you can enumerate the fields you want returned.

```php
$user = $this->user_model->with_phone('fields:mobile_number')->get(1);
```

Also you can count the sub-results by using `fields:*count*`.

```php
$users_with_number_posts = $this->user_model->with_posts('fields:*count*')->get_all();
```

Take note that you can retrieve the count as `counted_rows` (do a print_r() and
you'll understand what I mean).

With the `where:...` you can pass a where clause that will be interpreted as
string.

The where clause is an _exclusivist_ one. That means that it will retrieve only
results that are complying to the subresult's where. If a `users` table has
relationship with a `details` table, and you set a `where` clause inside the
with\_\*() method, that `where:...` looks only for the results that have
`first_name` of `John` in the `details` table, the final results that will be
returned will only be those users from the `users` table that have a related
first_name inside the `details` table of `John`.

```php
$user = $this->user_model->with_phone('fields:mobile_number', 'where:`phone_status`=\'active\'')->get(1);
```

A `non_exclusive_where` would return all the main results and only the
additional subresults appended to the main results.

_NB: You won't be able to add an exclusive and a non-exclusive where in the same
time_

The related data will be embedded in the returned value having "phone", and
"posts" as keys.

```php
echo $user->phone->phone_number;

foreach ($user->posts as $post)
{
    echo $post->title;
}
```

#### Order the results of the relastionship results

Sometimes you need to order the results coming from the with\_\*() method. In
order do this, you can use the order_inside parameter like below:

```php
$this->author_model->with_posts('fields:...|order_inside:published_at desc')->get_all();
```

A query like the one above should return all the authors with their respective
posts ordered by the publish date. You can also have more than one order inside
parameters:

```php
$this->author_model->with_posts('fields:...|order_inside:published_at desc, readings asc')->get_all();
```

#### Order THE MAIN RESULT by the relationship data

You can order the main result by using a field that can be found inside a
relationship column.

```php
$this->post_model->with_author("order_by:username,asc")->get_all();
```

The code above will order all the posts by the username of the authors
(ascending).

#### Retrieve data from nested relationships (or should we say retrieve nested relationships data?)

In order to retrieve data from nested relationships, we should pass the
with\_\*() method a multidimensional array. Let's assume we have a Country_model
with many City_model, the City_Model having many Company_model:

So... the Country_model.php: would look like this:

```php
class Country_model extends MY_Model
{
    function __construct()
    {
        $this->has_many['cities'] = array('foreign_model'=>'City_model','foreign_table'=>'cities','foreign_key'=>'country_id','local_key'=>'id');
    }
}
```

The City_model.php would look like this:

```php
class City_model extends MY_Model
{
    function __construct()
    {
        $this->has_one['country'] = array('foreign_model'=>'Country_model','foreign_table'=>'countries','foreign_key'=>'id','local_key'=>'country_id');
        $this->has_many['companies'] = array('foreign_model'=>'Company_model','foreign_table'=>'companies','foreign_key'=>'city_id','local_key'=>'id');
    }
}
```

The Company_model.php would look like this:

```php
class Company_model extends MY_Model
{
    function __construct()
    {
        $this->has_one['city'] = array('foreign_model'=>'City_model','foreign_table'=>'cities','foreign_key'=>'id','local_key'=>'city_id');
    }
}
```

Now, if we want to retrieve the cities with their companies from a country we
would go like this:

```php
$this->country_model->with_cities(array('fields'=>'name,id,population','with'=>array('relation'=>'companies','fields'=>'name,phone_number'))->get($country_id);
```

### Database Connection

The class will automatically use the default database connection, and even load
it for you if you haven't yet.

You can specify a database connection on a per-model basis by declaring the
`$_database_connection` instance variable.

You can also change the database connection on a per request basis. For example,
if you want to use a different database connection for writing data you can do
this:

```php
$this->user_model->on('write_conn')->delete(3);
```

After this, I would advise you to do a `$this->user_model->reset_connection();`
in order to reset the database connection to the model's (or application's)
default.

### Observers

There are times when you'll need to alter your model data before or after it's
inserted or returned. This could be adding timestamps, pulling in relationships
or deleting dependent rows. The MVC pattern states that these sorts of
operations need to go in the model. In order to facilitate this, MY_Model
contains a series of callbacks/observers -- methods that will be called at
certain points.

The full list of observers are as follows:

```php
$before_create = array();
$after_create = array();
$before_update = array();
$after_update = array();
$before_get = array();
$after_get = array();
$before_delete = array();
$after_delete = array();
$before_soft_delete = array();
$after_soft_delete = array();
```

These are instance variables usually defined at the class level. They are arrays
of methods on this class to be called at certain points. An example:

```php
class User_model extends MY_Model
{
	function __construct()
	{
		$this->before_create[] = 'hash_password';
		parent::__construct();
	}

	protected function hash_password($data)
    	{
        	$data['password'] = 'whateverpasswordcreationresultyoumaythinkof';
        	return $data;
    	}
}
```

Each observer overwrites its predecessor's data, sequentially, in the order the
observers are defined. In order to work with relationships, the MY_Model already
has an `after_get` trigger which will be called last.

### Available methods

#### insert($data)

It inserts one or more rows into table

##### Parameters

- $data - data to be inserted.

##### Return

- either a integer representing the id of the inserted row;
- or an array with ids.

##### Examples

```php
$data = array('username'=>'avenirer','email'=>'avenir.ro@gmail.com');
$this->user_model->insert($data);
```

#### update($data, $column_name_where = NULL)

It updates one or more rows from table

##### Parameters

- $data - the updated data as object or multidimensional array or multiple array
  (just like the native $this->db->update())
- $column_name_where - no value if you want to update all rows, an id of the
  row, an array containing column name and value or, if there are multiple rows,
  the name of the column that can be found in the $data array.

##### Return

Returns the number of affected rows

##### Examples

```php
$newdata = array('status'=>'1');
$this->user_model->update($data);

$newdata = array('username'=>'aveniro');
$this->user_model->update($data,1);

$newdata = array('username'=>'aveniro', 'email'=>'avenir.ro@gmail.ro');
$this->user_model->update($data,array('email'=>'avenir.ro@gmail.com'));

$newdata = array('username'=>'aveniro', 'email'=>'avenir.ro@gmail.com');
$this->user_model->update($data,'email');
```

#### where($field_or_array = NULL, $operator_or_value = NULL, $value = NULL, $with_or = FALSE, $with_not = FALSE, $custom_string = FALSE)

It sets a where condition to the query

##### Parameters

- $field_or_array, $operator_or_value = NULL - if you want to look by an id you
  can simply pass the id; if you want to look for a value of a column, you can
  pass it as to parameters where('column','value'); if you have multiple columns
  for identifing a row you can pass it an array
  where(array('column1'=>'value1','column2'=>'value2')); if you have a "where
  in" type of query (multiple posible values for a column), you can pass it the
  name of the column as first parameter and an array of possible values as
  second parameter;

##### Return

Doesn't return anything, being a part of the query chain

##### Examples

```php
$this->user_model->where(3)->get();
//you can also do it like this: $this->user_model->get(3);

$this->user_model->where('username','avenirer')->get();

$this->user_model->where('id >=', '3')->get();

$this->user_model->where(array('email'=>'avenir.ro@gmail.com','username'=>'avenirer'))->get();

$this->user_model->where('username',array('avenirer','aveniro')->get();
```

#### where\_\*()

Although I wouldn't advise (there are some buggy things there...), there is also
a "dynamic" where. That means that at any time you can write a where method that
contains the name of the column:

```php
$this->user_model->where_username('avenirer')->get(); // where the "username" value is avenirer
$this->user->model->where_mail(array('avenir.ro@gmail.com','adrian.voicu@avenir.ro'))->get_all();
```

#### limit($limit,$offset=0)

Is a self explaining method...

#### order_by($criteria, $order = 'ASC')

Is a wrapper for $this->db->order_by()

#### group_by($grouping_by)

Is a wrapper for $this->db->group_by()

#### delete(where)

It deletes or soft deletes (depending on your settings) rows, working like the
native $this->db->delete().

##### Parameters

##### Return

It returns affected rows or false, if no delete was done.

#### force_delete(where)

It forces the delete of row(s) if soft delete was enabled. Takes same parameters
and returns same thing like the method before

#### restore($where)

Restores row(s) that were previously soft deleted. Takes same parameters and
returns same thing like the method before

#### trashed($where)

Verifies if a row is soft deleted or not

##### Return

It returns TRUE or FALSE

##### Examples

```php
if($this->user_model->trashed(1))
{
	echo 'the user was deleted';
}
```

#### get($where = NULL)

Returns a single row that respects the $where parameter

##### Parameters

- where - the $where parameter uses the where($param) method, that means only
  one parameter

##### Return

Returns a row;

##### Examples

```php
$user = $this->user_model->get(1);

$user = $this->user_model->get(array('username'=>'avenirer'));
```

#### get_all($where = NULL)

Same as the get() method but it can return more than one row

#### paginate($rows_per_page = 10, $total_rows = NULL, $page_number = 1)

##### Parameters

- rows_per_page = 10 - the number of rows per page
- total_rows = NULL - the total number of rows
- page_number = 1 - current page number

##### Return

Returns the results and created the links that can be retrieved by accessing
"previous_page", "next_page" and "all_pages" properties

#### count_rows($where)

Returns the number of rows.

##### Example

```php
$users = $this->user_model->as_array()->count_rows();
```

#### as_array()

Sets the option to return the results as an array(), if the model was previously
set to return the results as objects.

##### Example

```php
$users = $this->user_model->as_array()->get_all();
```

#### fields($fields)

Allows the user to select only specific columns

#### Examples

```php
$users = $this->user_model->fields('username,password')->get_all();

$users = $this->user_model->fields(array('users.username', 'users.password', 'group.name')->get_all();
```

#### as_object()

Sets the option to return the results as object, if the model was previously set
to return the results as arrays.

##### Example

```php
$users = $this->user_model->as_object()->get_all();
```

#### with_trashed()

Sets the option to return in the results the rows that were soft deleted

##### Example

```php
$users = $this->user_model->with_trashed()->get_all;
```

#### only_trashed()

Sets the option to return in the results only the rows that were soft deleted

##### Example

```php
$users = $this->user_model->only_trashed()->get_all;
```

#### on($connection_group)

Sets a connection group for the current chain query

#### reset_connection()

Resets the connection to the database to the one that is set for the model or
the default connection

Enjoy using my MY_Model and please report any issues or try some pull requests.
Thank you

## How to Extend MY_Model

```php
class User_model extends MY_Model
{
    /**
     * Set the name of the table for this model.
     **/
    public $table = 'users';

    /**
     * Set the primary key
     **/
    public $primary_key = 'id';

    /**
     * You can set an array with the fields that can be filled by insert/update
     **/
    public $fillable = [];

    /**
     * Or you can set an array with the fields that cannot be filled by insert/update
     **/
    public $protected = [];


    public function __construct()
    {
        /**
         * Sets the connection preferences (group name) set up in the database.php. If not set,
         * it will use the 'default' (the $active_group) database connection.
        **/
        $this->_database_connection = 'group'; // group_name or [] | OPTIONAL

        /**
         * If set to TRUE tells MY_Model that the table has 'created_at','updated_at' (and
         * 'deleted_at' if $this->soft_delete is set to TRUE).  If given an array as parameter,
         * it tells MY_Model, that the first element is a created_at field type, the second element
         * is a updated_at field type (and the third element is a deleted_at field type)
         **/
        $this->timestamps = TRUE; // TRUE | ['made_at','modified_at','removed_at']

        /**
        * Enables (TRUE) or disables (FALSE) the "soft delete" on records. Default is FALSE
        */
        $this->soft_deletes = FALSE;

        /**
        * You can at any time change the way the timestamp is created (the default is the MySQL
        * standard datetime format) by modifying this variable. You can choose between whatever
        * format is acceptable by the php function date() (default is 'Y-m-d H:i:s'),
        * or 'timestamp' (UNIX timestamp)
        **/
        $this->timestamps_format = 'Y-m-d H:i:s'

        /**
         * Allows the model to return the results as object or as array
         **/
        $this->return_as = 'object' | 'array'

        $this->has_one['phone'] = 'Phone_model' //  or $this->has_one['phone'] = ['Phone_model','foreign_key','local_key'];

        /**
         * Allows establishing ONE TO ONE or more ONE TO ONE relationship(s) between models/tables
         **/
        $this->has_one['address'] = 'Address_model'  // or $this->has_one['address'] = ['Address_model','foreign_key','another_local_key'];

        /**
         * Allows establishing ONE TO MANY or more ONE TO MANY relationship(s) between models/tables
        **/
        $this->has_many['posts'] = 'Post_model' // or $this->has_many['posts'] = ['Posts_model','foreign_key','another_local_key'];

        /**
         * Allows establishing MANY TO MANY or more MANY TO MANY relationship(s) between models/tables
         * with the use of a PIVOT TABLE
         *
         *     !ATTENTION: The pivot table name must be composed of the two table names separated
         *     by "_" the table names having to to be alphabetically ordered (NOT users_posts,
         *     but posts_users).  Also the pivot table must contain as identifying columns the columns
         *     named by convention as follows: table_name_singular + _ + foreign_table_primary_key.
         *     For example: considering that a post can have multiple authors, a pivot table that
         *     connects two tables (users and posts) must be named posts_users and must have
         *     post_id and user_id as identifying columns for the posts.id and users.id tables.
        **/
        $this->has_many_pivot['posts'] = 'Post_model' // or $this->has_many_pivot['posts'] = ['Posts_model','foreign_primary_key','local_primary_key'];

        $this->cache_driver = 'file'

        /**
         * If you know you will do some caching of results without the native caching solution, you can at any
         * time use the MY_Model's caching. By default, MY_Model uses the files to cache result. If you want
         * to change the way it stores the cache, you can change the $cache_driver property to whatever
         * CodeIgniter cache driver you want to use. Also, with $cache_prefix, you can prefix the name of the
         * caches. by default any cache made by MY_Model starts with 'mm' + _ + "name chosen for cache"
         **/
        $this->cache_prefix = 'mm'

        /**
         * If you use caching often and you don't want to be forced to delete cache manually, you can enable
         * `$this->delete_cache_on_save` by setting it to TRUE. If set to TRUE the model will auto-delete all
         * cache related to the model's table whenever you write/update/delete data from that table.
         **/
        $this->delete_cache_on_save = FALSE

        /**
        *  If you know you will use the paginate() method, you can change the delimiters between the pages links
        **/
        $this->pagination_delimiters = ['<span>','</span>'];

        /**
        *  You can also change the way the previous and next arrows look.
        **/
        $this->pagination_arrows = ['&lt;','&gt;'];

        parent::__construct();
    }
}
```
