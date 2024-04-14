import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://tjommiboy.github.io/Workflow_CA",

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
