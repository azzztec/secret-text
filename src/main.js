// import {SALT} from './config.json'

const STR_START = "&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;"

const STR_END = "&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;"

const div = document.querySelector('div')

const _strToBinaryList = (str) => {
  const zeroBit = "00000000"

  return str.split('').map((char) => {
    const banaryStr = char.codePointAt().toString(2)
      return zeroBit.slice(banaryStr.length) + banaryStr
  })
}

const makeSecretStr = (str) => {
  if(typeof str !== 'string'){
    return ''
  }

  const binaryStrList = _strToBinaryList(str)

  const secretStrList = binaryStrList.map((binaryChar) => {
    return binaryChar.split('').reduce((prev, bit) => {
      if(bit == "0") {
        return prev += "&#8203;"
      } else if(bit == "1") {
        return prev += "&#8204;"
      }
    }, '')
  })

  const secretStr = STR_START + secretStrList.join('&#8205;') + STR_END
  return secretStr
}

const _takeSymbolsFromText = (text) => {
  const nonASCIIcharactersCodeList = text.match(/[^\x00-\x7F]/g)
  if(nonASCIIcharactersCodeList) {
    const nonASCIIcharactersCodeStr = nonASCIIcharactersCodeList
      .map(code => `&#${code.codePointAt()};`)
      .join('')
    const secretStrStartPos = nonASCIIcharactersCodeStr.indexOf(STR_START)
    const secretStrEndPos = nonASCIIcharactersCodeStr.indexOf(STR_END)

    if(secretStrStartPos !== -1 && secretStrEndPos !== -1) {
      return nonASCIIcharactersCodeStr.slice(STR_START.length, secretStrEndPos).split('&#8205;')
    }
    // return nonASCIIcharactersCodeStr
  }
}

const _fromASCIItoBinary = (asciiList) => {
  return asciiList.map(asciiStr => {
    return asciiStr.split(';').reduce((prev, asciiSmbl) => {
      if(asciiSmbl === "&#8203") {
        return prev += '0'
      } else if(asciiSmbl === "&#8204") {
        return prev += '1'
      } else if(asciiSmbl === '') {
        return prev
      }
    }, '')
  })
}

const _fromBinaryToOriginalStr = (binaryList) => {
  return binaryList.reduce((prev, binaryStr) => {
    return prev += String.fromCharCode(parseInt(binaryStr, 2))
  }, '')
}

const readSecretStr = (str) => {
  const nonASCIIcharactersCorrectCodeList = _takeSymbolsFromText(str)
  const binaryList = _fromASCIItoBinary(nonASCIIcharactersCorrectCodeList)
  const originalStr = _fromBinaryToOriginalStr(binaryList)

  return originalStr
}

div.innerHTML += makeSecretStr('hello world 1235')

console.log('read:', readSecretStr(div.innerHTML))