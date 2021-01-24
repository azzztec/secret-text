# Secret-Text

Hide any text without visible changes inside HTML DOM Node and get it back when needed.

## Download

> `npm i secret-text`

## Examples

```javascript
//insert secret string inside existing DOM element
let p = document.querySelector("p")
p.innerHTML += makeSecretStr("hello world!")

//get secret string from existing DOM element
let p = document.querySelector("p")
let originalStr = getSecretStr(p.innerHTML) // 'hello world!
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
