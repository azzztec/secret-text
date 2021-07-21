[![Coverage Status](https://coveralls.io/repos/github/azzztec/secret-text/badge.svg?branch=main)](https://coveralls.io/github/azzztec/secret-text?branch=main)
[![Build Status](https://www.travis-ci.com/azzztec/secret-text.svg?branch=main)](https://www.travis-ci.com/azzztec/secret-text)
![npm](https://img.shields.io/npm/v/secret-text)

# Secret-Text

Hide any text without visible changes inside HTML DOM Node and get it back when needed.

## Download

> npm i -D secret-text

## Examples

```javascript
import secretText from "secret-text"

//insert secret string inside existing DOM element
let div = document.querySelector("div")
div.innerHTML += secretText.makeSecretText("hello world!")

//get secret string from existing DOM element
let originalStr = secretText.getSecretText(div.innerHTML) // 'hello world!'
```

- Before:
  ![before](https://user-images.githubusercontent.com/57875019/105613212-67beb980-5dd2-11eb-8a4c-6714f88da0cd.png)
- After:
  ![after](https://user-images.githubusercontent.com/57875019/105613210-668d8c80-5dd2-11eb-81e1-999244b2751b.png)

## API

| Method                 | Argument Type | Return Type | Description                                               |
| ---------------------- | ------------- | ----------- | --------------------------------------------------------- |
| makeSecretText( text ) | string        | string      | Returns secret text encrypted with non-printable symbols. |
| getSecretText( text )  | string        | string      | Returns secret text from received text.                   |
