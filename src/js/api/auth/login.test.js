import { apiPath } from "../constants.js";
import { save } from "../../storage/index.js";
import { login } from "./login";

// Mock the dependencies
jest.mock("../headers.js", () => ({
  // Provide a mock implementation for the `headers` function
  headers: jest.fn().mockReturnValue({
    "Content-Type": "application/json",
    // Add other headers as necessary
  }),
}));
jest.mock("../../storage/index.js");
global.fetch = jest.fn(); // Mock the fetch function globally

describe("login function", () => {
  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it("should save token and profile upon successful login", async () => {
    // Arrange
    const email = "test@stud.noroff.com";
    const password = "password";
    const accessToken = "sampleToken";
    const profile = { username: "testuser", accessToken: accessToken };

    // Mock fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(profile),
    });

    // Act
    const result = await login(email, password);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/auth/login`,
      expect.objectContaining({
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          // Match other headers as necessary
        },
      }),
    );

    expect(save).toHaveBeenCalledWith("token", accessToken);
    expect(save).toHaveBeenCalledWith(
      "profile",
      expect.objectContaining({
        username: "testuser",
      }),
    );
    expect(result).toEqual({
      username: "testuser",
    });
  });

  it("should throw an error when response is not ok", async () => {
    // Arrange
    const email = "test@example.com";
    const password = "password";

    // Mock fetch response with a non-ok status
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    // Act and assert
    await expect(login(email, password)).rejects.toThrow("Unauthorized");
  });
});
