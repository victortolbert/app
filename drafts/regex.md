---
title: Regular Expressions
category: Snippets
position: 11
---

get all the numbers which contain . character and are preceded by $ character

```
(?<=\$)[0-9\.]*
```

## Positive Lookahead

optionally match lowercase letter t or uppercase letter `T`, followed by letter
`h`, followed by letter `e`. In parentheses we define positive lookahead which
tells regular expression engine to match `The` or `the` which are followed by
the word `fat`.

```
T|t]he(?=\sfat)
```

<https://regex101.com/r/IDDARt/1>

## Negative Lookahead

get all The or the words from input string that are not followed by the word fat
precedes by a space character.

```
[T|t]he(?!\sfat)
```

<https://regex101.com/r/V32Npg/1>

## Negative Lookbehind

get all `cat` words from input string that are not after the word `The` or `the`

```
(?<!(T|t)he\s)(cat)
```

<https://regex101.com/r/8Efx5G/1>
