export default {
    transform: {
      "^.+\\.js$": "babel-jest"
    },
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    moduleFileExtensions: ["js"],
    verbose: true
  };
  