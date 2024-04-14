import { apiPath } from "../../../src/js/api/constants";

it("handles invalid login attempts and shows error message", () => {
  // Perform an API request to the login endpoint with invalid credentials
  cy.request({
    method: "POST",
    url: `${apiPath}/social/auth/login`,
    failOnStatusCode: false, // Prevents the test from failing on non-2xx status codes
    body: {
      email: "invalid_email@domain.com", // Use invalid email
      password: "invalid_password", // Use invalid password
    },
  }).then((res) => {
    // Check the response status code and handle appropriately
    if (res.status === 401 && res.body && res.body.errors) {
      // Visit the base URL of the application
      cy.visit("/");

      // Look for the error message on the user interface
      cy.get(".invalid-password-or-email", { timeout: 10000 }) // Ensure to use the correct selector and increase timeout
        .should("be.visible")
        .and("contain", "Invalid email or password"); // Check the error message content

      // Test passes if the expected error message is found
    } else {
      // If the login request succeeds or another unexpected response is received, fail the test
      throw new Error(
        `Unexpected login response: status code ${res.status}, response body ${JSON.stringify(res.body)}`,
      );
    }
  });
});
