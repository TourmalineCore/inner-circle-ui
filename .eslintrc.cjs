module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:cypress/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    // disables "Unused eslint-disable directive (no problems were reported)" for auto-generated api-types/index.ts 
    "api-types",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      tsx: true
    },
  },
  plugins: [
    "react-refresh",
    "react",
    "import",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["node_modules", "src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  rules: {
    // disable chain cy error
    'cypress/unsafe-to-chain-command': 'off',
    "no-console": "error",
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    // semi and @typescript-eslint/semi configured to get rid of semicolons at the end of each line
    semi: [
      "error",
      "never",
    ],
    // https://eslint.org/docs/rules/indent here you can read about SwitchCase
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
      },
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    // remove any type error
    "@typescript-eslint/no-explicit-any": "off",

    //remove comment error
    "@typescript-eslint/ban-ts-comment": "off",

    "@typescript-eslint/semi": "off",
    "@typescript-eslint/member-delimiter-style": [
      "warn", {
        "multiline": {
          "delimiter": "comma",
          "requireLast": true,
        },
        "singleline": {
          "delimiter": "comma",
          "requireLast": true,
        },
        "multilineDetection": "brackets",
      },
    ],
    "no-multi-spaces": "error",
    "react/jsx-max-props-per-line": [
      1,
      {
        "maximum": 1,
      },
    ],
    "react/jsx-curly-spacing": [
      2,
      {
        "when": "never",
        "children": true,
      },
    ],
    "@typescript-eslint/quotes": [
      "error",
      "backtick",
      {
        "avoidEscape": true,
      },
    ],
    "object-property-newline": [
      "error",
      {
        "allowAllPropertiesOnSameLine": false,
      },
    ],
    "import/no-default-export": 2,
    "brace-style": [
      "error",
      "stroustrup",
    ],
    // https://stackoverflow.com/a/75887813
    "object-curly-newline": [
      "error", {
        "ObjectExpression": {
          "multiline": true,
          "minProperties": 1,
        },
        "ObjectPattern": {
          "multiline": true,
          "minProperties": 1,
        },
        "ImportDeclaration": "never",
        "ExportDeclaration": {
          "multiline": true,
          "minProperties": 1,
        },
      },
    ],
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 0,
      },
    ],
    "array-element-newline": [
      "error",
      "always",
      {
        "minItems": 1,
      },
    ],
    "array-bracket-newline": [
      "error",
      {
        "multiline": true,
        "minItems": 1,
      },
    ],
    "newline-per-chained-call": [
      "error",
      {
        "ignoreChainWithDepth": 1,
      },
    ],
    "react-hooks/exhaustive-deps": 0
  },
}