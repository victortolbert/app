---
title: Using  MY_Model Example
category: CodeIgniter
source: http://oldblog.codebyjeff.com/blog/2012/01/using-jamie-rumbelows-my_model
references:
  - http://codeigniter.tv/a-11/Extending-the-Codeigniter-core-MY_Model-part-1
  - https://avenir.ro/revisiting-my_model-copying-jamie-rumbelow-looking-eloquent/
---

## Setup

### 1. Download the library from the link above and put it in your `/core` directory

### 2. Create a table:

```sql
CREATE TABLE IF NOT EXISTS `articles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(250) DEFAULT NULL,
    `body` text,
    PRIMARY KEY (`id`),
    FULLTEXT KEY `body` (`body`,`title`)
) ENGINE=MyISAM

INSERT INTO `articles` (`id`, `title`, `body`)
VALUES
(1, 'Something about bears', 'bears are fuzzy and cute - but don''t try to pet them!'),
(2, 'Fuzzy Wuzzy', 'Fuzzy Wuzzy was a bear; Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn''t very fuzzy, was he?'),
(3, 'Dumb and boring post', 'This is dumb and boring'),
(4, 'Dumb and boring post', 'This is dumb and boring, too.');
```

### 3. Create a model called Article_model.php (no "s")

```php
class Article_model extends MY_Model
{

}
```

### 4. Make a test controller to run all your queries from.

Here is a fairly complete list of all of the functions available to you, each
one given by an example with the output you should expect (if you run them one
at a time in order), as well as the actual SQL generated. My thought is this
will be all you need to get going. All of this code should go in your
controller. Don't forget to start with:

```php
$this->load->model('article_model');
```

```php
$row = $this->article_model->get(2);
// stdClass Object ( [body] => Fuzzy Wuzzy was a bear; Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't very fuzzy, was he? [title] => Fuzzy Wuzzy [id] => 2 )
// SELECT * FROM (`articles`) WHERE `id` = 2

$row = $this->article_model->get_by('title', 'Fuzzy Wuzzy');
// stdClass Object ( [body] => Fuzzy Wuzzy was a bear; Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't very fuzzy, was he? [title] => Fuzzy Wuzzy [id] => 2 )
// SELECT * FROM (`articles`) WHERE `title` = 'Fuzzy Wuzzy'
// NOTE: if more than 1, returns first

$result = $this->article_model->get_many([1, 3, 4]);
// Array ( [0] => stdClass Object ( [body] => bears are fuzzy and cute - but don't try to pet them! [title] => Something about bears [id] => 1 ) [1] => stdClass Object ( [body] => This is dumb and boring [title] => Dumb and boring post [id] => 3 ) [2] => stdClass Object ( [body] => This is dumb and boring, too. [title] => Dumb and boring post [id] => 4 ) )
// SELECT * FROM (`articles`) WHERE `id` IN (1, 3, 4)

$result = $this->article_model->get_many_by('title', 'Dumb and boring post');
// Array ( [0] => stdClass Object ( [body] => This is dumb and boring [title] => Dumb and boring post [id] => 3 ) [1] => stdClass Object ( [body] => This is dumb and boring, too. [title] => Dumb and boring post [id] => 4 ) )
// SELECT * FROM (`articles`) WHERE `title` = 'Dumb and boring post'

$result = $this->article_model->get_all();
// Array ( [0] => stdClass Object ( [body] => bears are fuzzy and cute - but don't try to pet them! [title] => Something about bears [id] => 1 ) [1] => stdClass Object ( [body] => Fuzzy Wuzzy was a bear; Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't very fuzzy, was he? [title] => Fuzzy Wuzzy [id] => 2 ) [2] => stdClass Object ( [body] => This is dumb and boring [title] => Dumb and boring post [id] => 3 ) [3] => stdClass Object ( [body] => This is dumb and boring, too. [title] => Dumb and boring post [id] => 4 ) [4] => stdClass Object ( [body] => Ain't no sunshine [title] => When she's gone [id] => 13 ) [5] => stdClass Object ( [body] => Woot! [title] => My thoughts [id] => 11 ) [6] => stdClass Object ( [body] => Hello [title] => I must be going [id] => 12 ) )
// SELECT * FROM (`articles`)

$count = $this->article_model->count_by('title', 'Dumb and boring post');
// 2
// SELECT COUNT(*) AS `numrows` FROM (`articles`) WHERE `title` = 'Dumb and boring post'

$count = $this->article_model->count_all();
// 4
// SELECT COUNT(*) AS `numrows` FROM `articles`

$insert_id = $this->article_model->insert(['body'=>'Woot!', 'title'=>'My thoughts'], FALSE);
// 5
// INSERT INTO `articles` (`body`, `title`) VALUES ('Woot!', 'My thoughts')

$insert_array = [
    ['body' => 'Hello', 'title' => 'I must be going'],
    ['body' => "When she's gone", 'title' => "Ain't no sunshine"],
];

$insert_ids = $this->article_model->insert_many($insert_array, FALSE);
// Array ( [0] => 16 [1] => 17 ) //1
// INSERT INTO `articles` (`body`, `title`) VALUES ('When she\'s gone', 'Ain\'t no sunshine')

$update_id = $this->article_model->update(4, ['body' => 'This is dumber and more boring', 'title' => 'Dumber and boringer']);
// 1
// UPDATE `articles` SET `body` = 'This is dumber and more boring', `title` = 'Dumber and boringer' WHERE `id` = 4

$update_id = $this->article_model->update_by(['title' => 'My thoughts'], ['body' => 'Having deeper thoughts']);
// 1
// UPDATE `articles` SET `body` = 'Having deeper thoughts' WHERE `title` = 'My thoughts'

$update_id = $this->article_model->update_many([3, 4, 5], ['body' => "Oh! I've been updated...and I feel MARVELOUS!"]);
// 1
// UPDATE `articles` SET `body` = 'Oh! I\'ve been updated...and I feel MARVELOUS!' WHERE `id` IN (3, 4, 5)

$update_id = $this->article_model->update_all(['title' => "Another dumb title"]);
// 1
// UPDATE `articles` SET `title` = 'Another dumb title'

$delete_id = $this->article_model->delete( 7);
// 1
// DELETE FROM `articles` WHERE `id` = 7

$delete_id = $this->article_model->delete_by(['body' => 'Hello']);
// 1
// DELETE FROM `articles` WHERE `body` = 'Hello'

$delete_id = $this->article_model->delete_many([3, 4 ,5]);
// 1
// DELETE FROM `articles` WHERE `id` IN (3, 4, 5)

//// Utilities ////

// dropdown - automatically picks the primary key if only one value passed
$dropdown_array = $this->article_model->dropdown('title');
// Array ( [1] => Another dumb title [2] => Another dumb title )
// SELECT `id`, `title` FROM (`articles`)

// otherwise, give it a key, value pair to build on (my data is bad for example at this point)
$dropdown_array = $this->article_model->dropdown('title', 'body');
// Array ( [Another dumb title] => Fuzzy Wuzzy was a bear; Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't very fuzzy, was he? )
// SELECT `title`, `body` FROM (`articles`)
```

## Finally, a couple of common tasks you might be after (this code goes in `article_model.php` ):

### 1. I only want certain fields

Create a new function to make your select function call, but then stick to the
parent `get()`

```php
function select($fields)
{
    $this->db->select($fields);
    return $row = $this->get(2);
}

// SELECT `title` FROM (`articles`) WHERE `id` = 2
```

### 2. I want to validate my insert

Create all the validation rules you might need for anything on this table at the
top of your class. NOTICE it is an array of arrays (check the user guide
http://codeigniter.com/user_guide/libraries/form_validation.html#rulereference
for rules)

```php
protected $validate = [['title'=>'required']];
```
