const path = require("path");

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  testMatch: ["**/tests/**/*.spec.[jt]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}", "!src/main.js"],
  moduleNameMapper: {
    "^@/(.*)$": path.resolve(__dirname, "src/$1"), // Usar `path.resolve`
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Archivo de configuración adicional
};
