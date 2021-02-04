[![Coverage Status](https://coveralls.io/repos/github/azzztec/secret-text/badge.svg?branch=main)](https://coveralls.io/github/azzztec/secret-text?branch=main)
[![Build Status](https://travis-ci.org/azzztec/secret-text.svg?branch=main)](https://travis-ci.org/azzztec/secret-text)

# Secret-Text

Hide any text without visible changes inside HTML DOM Node and get it back when needed.

## Download

> npm i -D secret-text`

## Examples

```javascript
import secretText from "secret-text"

//insert secret string inside existing DOM element
let p = document.querySelector("p")
p.innerHTML += secretText.makeSecretStr("hello world!")

//get secret string from existing DOM element
let p = document.querySelector("p")
let originalStr = secretText.getSecretStr(p.innerHTML) // 'hello world!'
```

- Before:
  ![before](https://user-images.githubusercontent.com/57875019/105613212-67beb980-5dd2-11eb-8a4c-6714f88da0cd.png)
- After:
  ![after](https://user-images.githubusercontent.com/57875019/105613210-668d8c80-5dd2-11eb-81e1-999244b2751b.png)

## API

| Function              | Argument Type | Return Type | Description                                     |
| --------------------- | ------------- | ----------- | ----------------------------------------------- |
| makeSecretStr( text ) | string        | string      | Return original text with secret string inside. |
| getSecretStr( text )  | string        | string      | Return secret string from received text.        |
