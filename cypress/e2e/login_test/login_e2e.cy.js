import { apiPath } from "../../../src/js/api/constants";

it("logs in user and saves token using API request", () => {
  // Authenticate using a POST request to the login API endpoint
  cy.request({
    method: "POST",
    url: `${apiPath}/social/auth/login`,
    body: {
      email: "engangtil@stud.noroff.no",
      password: "Tascam123",
    },
  }).then((res) => {
    if (res.status === 200 && res.body.accessToken) {
      // Store the access token in local storage
      cy.window().then((win) => {
        win.localStorage.setItem("token", res.body.accessToken);
      });
    } else {
      // Throw an error if the login request fails
      throw new Error(`Login failed with status code ${res.status}`);
    }
  });

  // Visit the base URL of the application
  cy.visit("/");

  // Assert that the URL matches the base URL of the application
  cy.url().should("eq", "https://tjommiboy.github.io/Workflow_CA/");
});
