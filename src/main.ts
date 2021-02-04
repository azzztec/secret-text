import { STR_START, STR_END } from "./config.json"

export default class SecretText {
  public static makeSecretText(text: string): string {
    if (typeof text !== "string" || text === "") {
      return ""
    }
    const binaryStrList: string[] = this.strToBinaryList(text)
    const secretStrList: string[] = this.binaryListToStrList(binaryStrList)
    return STR_START + secretStrList.join("&#8205;") + STR_END
  }

  private static binaryListToStrList(binaryStrList: string[]): string[] {
    return binaryStrList.map((binaryChar) =>
      binaryChar.split("").reduce((prev, bit) => {
        if (bit === "0") {
          return (prev += "&#8203;")
        }
        if (bit === "1") {
          return (prev += "&#8204;")
        }
        return ""
      }, "")
    )
  }

  private static strToBinaryList(text: string): string[] {
    const binaryStrList: any = text.split("").map((char) => char?.codePointAt(0)?.toString(2))

    return binaryStrList
  }

  public static getSecretText(text: string): string {
    const nonPrintableSybolsList: string[] = this.takeSymbolsFromText(text)
    const binaryStrList: string[] = this.fromNonPrintableToBinary(nonPrintableSybolsList)
    const originalStr: string = binaryStrList.reduce(
      (prev, binaryStr) => (prev += String.fromCharCode(parseInt(binaryStr, 2))),
      ""
    )

    return originalStr
  }

  private static takeSymbolsFromText = (text: string): string[] => {
    const nonASCIIcharactersCodeList: RegExpMatchArray | null = text.match(/[^\x00-\x7F]/g)
    if (nonASCIIcharactersCodeList) {
      const nonASCIIcharactersCodeStr: string = nonASCIIcharactersCodeList
        .map((code) => `&#${code.codePointAt(0)};`)
        .join("")
      const secretStrStartPos: number = nonASCIIcharactersCodeStr.indexOf(STR_START)
      const secretStrEndPos: number = nonASCIIcharactersCodeStr.indexOf(STR_END)

      if (secretStrStartPos !== -1 && secretStrEndPos !== -1) {
        return nonASCIIcharactersCodeStr.slice(STR_START.length, secretStrEndPos).split("&#8205;")
      }
    }
    return [""]
  }

  private static fromNonPrintableToBinary = (asciiList: string[]): string[] =>
    asciiList.map((asciiStr) =>
      asciiStr.split(";").reduce((prev, asciiSmbl) => {
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
    )
}
