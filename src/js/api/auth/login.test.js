import { apiPath } from "../constants.js";
import { save } from "../../storage/index.js";
import { login } from "./login";

jest.mock("../headers.js", () => ({
  headers: jest.fn().mockReturnValue({
    "Content-Type": "application/json",
  }),
}));
jest.mock("../../storage/index.js");
global.fetch = jest.fn();

describe("login function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("saves token and profile on successful login", async () => {
    const email = "test@stud.noroff.com";
    const password = "password";
    const accessToken = "sampleToken";
    const profile = { username: "testuser", accessToken: accessToken };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(profile),
    });

    const result = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/auth/login`,
      expect.objectContaining({
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
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
