import { remove } from "../../storage/index.js";
import { logout } from "./logout"; // Adjust the path accordingly

// Mock the remove function
jest.mock("../../storage/index.js");

describe("logout function", () => {
  it("should call remove with 'token' and 'profile'", () => {
    // Invoke the logout function
    logout();

    // Check that remove was called twice
    expect(remove).toHaveBeenCalledTimes(2);

    // Check that remove was called with 'token' and 'profile'
    expect(remove).toHaveBeenCalledWith("token");
    expect(remove).toHaveBeenCalledWith("profile");
  });
});
