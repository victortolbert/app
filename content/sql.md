---
title: SQL
---

## Basic tables

```sql
CREATE TABLE users (email TEXT, name TEXT)
INSERT INTO users (email, name) VALUES ('amir@example.com', 'Amir')
SELECT * FROM users
```

## Basic column types

```sql
CREATE TABLE cats (name TEXT, age INTEGER)
INSERT INTO cats (name, age) VALUES ('Ms. Fluff', 3)
SELECT * FROM cats
-- [{age: 3, name: 'Ms. Fluff'}]
```

## Selecting columns

```sql
CREATE TABLE users (name TEXT, login_count INTEGER)
INSERT INTO users (name, login_count) VALUES ('Amir', 1)
SELECT name FROM users
-- [{name: 'Amir'}]
```

## Select where

```sql
CREATE TABLE users (email TEXT, name TEXT)
INSERT INTO users (email, name) VALUES ('amir@example.com', 'Amir')
INSERT INTO users (email, name) VALUES ('betty.j@example.com', 'Betty')
SELECT name FROM users WHERE name = 'Amir'
-- [{name: 'Amir'}]
```

```sql
CREATE TABLE users (email TEXT, name TEXT)
INSERT INTO users (email, name) VALUES ('amir@example.com', 'Amir')
INSERT INTO users (email, name) VALUES ('betty@example.com', 'Betty')
SELECT name FROM users WHERE length(name) > 4
-- [{name: 'Betty'}]
```

## No type enforcement in SQLite

```sql
CREATE TABLE rectangles (width REAL, height REAL)
INSERT INTO rectangles (width, height) VALUES ('oh', 'no')
SELECT * FROM rectangles
-- [{height: 'no', width: 'oh'}]
```

## Null

```sql
INSERT INTO users (name, login_count) VALUES (NULL, NULL)
SELECT * FROM users
-- Error: NOT NULL constraint failed: users.name
```

```sql
CREATE TABLE users (name TEXT NOT NULL, login_count INTEGER NULL)
INSERT INTO users (name, login_count) VALUES ('Amir', NULL)
SELECT * FROM users
-- [{login_count: null, name: 'Amir'}]
```

## No booleans in SQLite

```sql
CREATE TABLE cats (name TEXT, vaccinated INTEGER)
INSERT INTO cats (name, vaccinated) VALUES ('Ms. Fluff', 1);
-- []
```

## Updating rows

```sql
CREATE TABLE cats (name TEXT, age INTEGER)
INSERT INTO cats (name, age) VALUES ('Ms. Fluff', 3)
INSERT INTO cats (name, age) VALUES ('Keanu', 2)
UPDATE cats SET name = 'Cat'
SELECT name FROM cats
-- [{name: 'Cat'}, {name: 'Cat'}]
```

## Selecting expressions

```sql
SELECT 1 + 1
-- [{'1 + 1': 2}]
```

## Column aliases

```sql
CREATE TABLE cats (name TEXT, age INTEGER)
INSERT INTO cats (name, age) VALUES ('Keanu', 2)
SELECT name, age AS oldness FROM cats
-- [{name: 'Keanu', oldness: 2}]
```

## Unique constraints

```sql

CREATE TABLE users (
  name TEXT NOT NULL,
  cat_name TEXT NOT NULL,
  UNIQUE (name, cat_name)
)

INSERT INTO users (name, cat_name) VALUES ('Amir', 'Ms. Fluff')
INSERT INTO users (name, cat_name) VALUES ('Amir', 'Ms. Fluff')
-- Error: UNIQUE constraint failed: users.name, users.cat_name
```

```sql
CREATE TABLE users (email TEXT UNIQUE, name TEXT)
INSERT INTO users (email, name) VALUES ('alex@example.com', 'Alexandra')
INSERT INTO users (email, name) VALUES ('alex@example.com', 'Alexander')
SELECT * FROM users
-- Error: UNIQUE constraint failed: users.email
```

## Deleting rows

```sql
INSERT INTO users (email, name) VALUES ('amir@example.com', 'Amir')
INSERT INTO users (email, name) VALUES ('betty.j@example.com', 'Betty')
DELETE FROM users WHERE name = 'Betty'
SELECT name FROM users
-- [{name: 'Amir'}]
```

```sql
CREATE TABLE users (email TEXT, name TEXT)
INSERT INTO users (email, name) VALUES ('amir@example.com', 'Amir')
INSERT INTO users (email, name) VALUES ('betty.j@example.com', 'Betty')
DELETE FROM users
SELECT name FROM users
-- []
```

## Primary keys

```sql
CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT)
INSERT INTO people (name) VALUES ('Amir')
INSERT INTO people (name) VALUES ('Betty')
SELECT * FROM people
-- [{id: 1, name: 'Amir'}, {id: 2, name: 'Betty'}]
```

## Dropping tables and columns

```sql
CREATE TABLE users (email TEXT, name TEXT)
DROP TABLE users
-- []
```

## Bind parameters

```sql
CREATE TABLE users (id INTEGER NOT NULL, name TEXT)
INSERT INTO users (id, name) VALUES (1, 'Amir')
INSERT INTO users (id, name) VALUES (2, 'Betty')

-- const users = SELECT name FROM users WHERE id = ?`, [2])
-- users[0].name
-- 'Betty'
```

## Multiple statements

```sql
SELECT 1; SELECT 2 AS two
-- [{two: 2}]
```

## Comments

```sql

  CREATE TABLE cats (
    id INTEGER PRIMARY KEY
    -- name TEXT
    /* owner_name TEXT */
  )

-- (both line comments and multiline comments are supported)
```

## Referencing other tables

```sql
CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE cats (owner_id INTEGER NOT NULL, name TEXT NOT NULL);
-- The cats table's owner_id references peoples' IDs.
```

## Comparing with null

```sql
SELECT NULL + 1 AS result
-- [{result: null}]
```

```sql
SELECT NULL = NULL AS result
-- [{result: null}]
```

```sql
SELECT 5 IS NOT NULL AS result
-- [{result: 1}]
```

## Defaults

```sql
  CREATE TABLE users (
    name TEXT,
    login_count INTEGER NOT NULL DEFAULT 0
  );
-- []
```

## Null in unique constraints

```sql
CREATE TABLE users (email TEXT NULL UNIQUE)
INSERT INTO users (email) VALUES (NULL)
INSERT INTO users (email) VALUES (NULL)
SELECT * FROM users
-- [{email: null}, {email: null}]
```

## Inserting multiple rows

```sql
CREATE TABLE users (name TEXT NOT NULL)

  INSERT INTO users (name) VALUES
    ('Amir'),
    ('Betty'),
    ('Cindy')

SELECT * FROM users
-- [{name: 'Amir'}, {name: 'Betty'}, {name: 'Cindy'}]

```

## Selecting expressions from tables

```sql
CREATE TABLE cats (name TEXT)
INSERT INTO cats (name) VALUES ('Ms. Fluff')
SELECT name || ' the cat' AS name FROM cats
-- [{name: 'Ms. Fluff the cat'}]
```
