module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
      "react": {
        "createClass": "h", // Regex for Component Factory to use, default to "createReactClass"
        "pragma": "h",  // Pragma to use, default to "React"
      }
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": ["warn"],
        "react/jsx-uses-react": [1],
        "react/jsx-uses-vars": [2]
    }
};
