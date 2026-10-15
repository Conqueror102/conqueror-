import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    // The VS Code edition is kept as-is; its code-style text ("// About Me", quotes) is intentional.
    files: ["src/legacy/**"],
    rules: {
      "react/no-unescaped-entities": "off",
      "react/jsx-no-comment-textnodes": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
]

export default eslintConfig
