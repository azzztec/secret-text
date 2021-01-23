# Secret-Text

Hide any text without visible changes inside HTML DOM Node and get it back when needed.

## Download

> `npm i -D secret-text`

## Examples

```javascript
//insert secret string inside existing DOM element
let p = document.querySelector("p")
p.innerHTML += makeSecretStr("hello world!")

//get secret string from existing DOM element
let p = document.querySelector("p")
let originalStr = getSecretStr(p.innerHTML) // 'hello world!
```

- ####Before
  ![](https://www.google.com/url?sa=i&url=https%3A%2F%2Farchive.gulte.com%2Fmovienews%2F78502%2FWaiting-for-Ismart-Shankar-video-songs&psig=AOvVaw1SAd7LBjCvbKw1wCWqoGvH&ust=1611519289975000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJChkKvvsu4CFQAAAAAdAAAAABAP)
- ####After
  ![](https://drive.google.com/uc?export=view&id=1my4kyhM51xePe4_otAilH6Xz-SKF4I_Q)

## API

| Function              | Argument Type | Return Type | Description                                     |
| --------------------- | ------------- | ----------- | ----------------------------------------------- |
| makeSecretStr( text ) | string        | string      | Return original text with secret string inside. |
| getSecretStr( text )  | string        | string      | Return secret string from received text.        |
