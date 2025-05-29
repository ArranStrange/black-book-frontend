import { defineConfig } from "cypress";
import webpackConfig from "./webpack.config";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
    specPattern: "src/**/*.cy.{ts,tsx,js,jsx}",
    supportFile: "cypress/support/component.ts",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
