import { makeSecretStr, readSecretStr } from "./main.js"
import config from "./config.json"

describe("Check secret strings that was made", () => {
  test("Should return correct secret string of string_1", () => {
    expect(makeSecretStr("hello world")).toMatch(config.test.H_W_MATCH)
  })

  test("Should return correct secret string of string_2", () => {
    expect(makeSecretStr(" ")).toMatch(config.test.EMPTY_MATCH)
  })

  test("Should return correct secret string of string_3", () => {
    expect(makeSecretStr("secret")).toMatch(config.test.SECRET_MATCH)
  })

  test("Should return correct secret string of string_4", () => {
    expect(makeSecretStr(".,`~^:;№!?%$#&*@\"(){}[]+=-*/\\'")).toMatch(config.test.SMBLS_MATCH)
  })

  test("Should return correct secret string of string_5", () => {
    expect(makeSecretStr("1234567890")).toMatch(config.test.NUMBER_MATCH)
  })

  test("Should return empty string if empty string is passed", () => {
    expect(makeSecretStr("")).toMatch("")
  })

  test("Should return empty string if not a string is passed", () => {
    expect(makeSecretStr(1234)).toMatch("")
    expect(makeSecretStr(false)).toMatch("")
    expect(makeSecretStr([])).toMatch("")
    expect(makeSecretStr({})).toMatch("")
    expect(makeSecretStr()).toMatch("")
    expect(makeSecretStr(undefined)).toMatch("")
  })
})

describe("Check original string that converted from secret string", () => {
  beforeAll(() => {
    window.customDivForTest = document.createElement("div")
    window.customDivForTest.innerHTML = "some existed text" + config.test.ORIGINAL_SECRET_STR
  })

  test("Should return original string", () => {
    expect(readSecretStr(window.customDivForTest.innerHTML)).toMatch(config.test.ORIGINAL_STR)
  })
})
