import json from "@rollup/plugin-json"
import typescript from "rollup-plugin-typescript2"

export default [
  {
    input: "src/main.ts",
    output: {
      file: "./dist/main.js",
      format: "umd",
      name: "bundle",
    },
    plugins: [
      typescript(),
      json({
        compact: true,
      }),
    ],
  },
]
