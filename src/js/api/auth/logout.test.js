import { remove } from "../../storage/index.js";
import { logout } from "./logout";

jest.mock("../../storage/index.js");

describe("logout function", () => {
  it("should call remove with 'token' and 'profile'", () => {
    logout();

    expect(remove).toHaveBeenCalledTimes(2);

    expect(remove).toHaveBeenCalledWith("token");
    expect(remove).toHaveBeenCalledWith("profile");
  });
});
