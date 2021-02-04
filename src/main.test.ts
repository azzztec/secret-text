import SecretText from "./main"
import config from "./config.json"

declare global {
  interface Window {
    customDivForTest: any
  }
}

describe("Check secret strings that was made", () => {
  test("Should return correct secret string of string_1", () => {
    expect(SecretText.makeSecretText("hello world")).toMatch(config.test.H_W_MATCH)
  })

  test("Should return correct secret string of string_2", () => {
    expect(SecretText.makeSecretText(" ")).toMatch(config.test.EMPTY_MATCH)
  })

  test("Should return correct secret string of string_3", () => {
    expect(SecretText.makeSecretText("secret")).toMatch(config.test.SECRET_MATCH)
  })

  test("Should return correct secret string of string_4", () => {
    expect(SecretText.makeSecretText(".,`~^:;№!?%$#&*@\"(){}[]+=-*/\\'")).toMatch(
      config.test.SMBLS_MATCH
    )
  })

  test("Should return correct secret string of string_5", () => {
    expect(SecretText.makeSecretText("1234567890")).toMatch(config.test.NUMBER_MATCH)
  })

  test("Should return empty string if empty string is passed", () => {
    expect(SecretText.makeSecretText("")).toMatch("")
  })
})

describe("Check original string that converted from secret string", () => {
  beforeAll(() => {
    window.customDivForTest = document.createElement("div")
    window.customDivForTest.innerHTML = `some existed text${config.test.ORIGINAL_SECRET_STR}`
  })

  test("Should return original string", () => {
    expect(SecretText.getSecretText(window.customDivForTest.innerHTML)).toMatch(
      config.test.ORIGINAL_STR
    )
  })
})
