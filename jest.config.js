module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRunner: "jest-circus/runner",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
