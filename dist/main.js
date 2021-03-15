;(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.bundle = factory()))
})(this, function () {
  "use strict"

  var STR_START =
    "&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;"
  var STR_END =
    "&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8204;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;&#8203;&#8204;&#8204;&#8203;&#8203;&#8204;&#8203;"

  var SecretText = /** @class */ (function () {
    function SecretText() {}
    SecretText.makeSecretText = function (text) {
      if (typeof text !== "string" || text === "") {
        return ""
      }
      var binaryStrList = this.strToBinaryList(text)
      var secretStrList = this.binaryListToStrList(binaryStrList)
      return STR_START + secretStrList.join("&#8205;") + STR_END
    }
    SecretText.binaryListToStrList = function (binaryStrList) {
      return binaryStrList.map(function (binaryChar) {
        return binaryChar.split("").reduce(function (prev, bit) {
          if (bit === "0") {
            return (prev += "&#8203;")
          }
          if (bit === "1") {
            return (prev += "&#8204;")
          }
          return ""
        }, "")
      })
    }
    SecretText.strToBinaryList = function (text) {
      var binaryStrList = text.split("").map(function (char) {
        var _a
        return (_a = char === null || char === void 0 ? void 0 : char.codePointAt(0)) === null ||
          _a === void 0
          ? void 0
          : _a.toString(2)
      })
      return binaryStrList
    }
    SecretText.getSecretText = function (text) {
      var nonPrintableSybolsList = this.takeSymbolsFromText(text)
      var binaryStrList = this.fromNonPrintableToBinary(nonPrintableSybolsList)
      var originalStr = binaryStrList.reduce(function (prev, binaryStr) {
        return (prev += String.fromCharCode(parseInt(binaryStr, 2)))
      }, "")
      return originalStr
    }
    SecretText.takeSymbolsFromText = function (text) {
      var nonASCIIcharactersCodeList = text.match(/[^\x00-\x7F]/g)
      if (nonASCIIcharactersCodeList) {
        var nonASCIIcharactersCodeStr = nonASCIIcharactersCodeList
          .map(function (code) {
            return "&#" + code.codePointAt(0) + ";"
          })
          .join("")
        var secretStrStartPos = nonASCIIcharactersCodeStr.indexOf(STR_START)
        var secretStrEndPos = nonASCIIcharactersCodeStr.indexOf(STR_END)
        if (secretStrStartPos !== -1 && secretStrEndPos !== -1) {
          return nonASCIIcharactersCodeStr.slice(STR_START.length, secretStrEndPos).split("&#8205;")
        }
      }
      return [""]
    }
    SecretText.fromNonPrintableToBinary = function (asciiList) {
      return asciiList.map(function (asciiStr) {
        return asciiStr.split(";").reduce(function (prev, asciiSmbl) {
          if (asciiSmbl === "&#8203") {
            return (prev += "0")
          }
          if (asciiSmbl === "&#8204") {
            return (prev += "1")
          }
          if (asciiSmbl === "") {
            return prev
          }
          return ""
        }, "")
      })
    }
    return SecretText
  })()

  return SecretText
})
