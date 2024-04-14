import { save } from "./save.js";

global.localStorage = {
  setItem: jest.fn((key, value) => {
    global.localStorage[key] = value;
  }),
  getItem: jest.fn((key) => {
    console.log(this);
    return global.localStorage[key];
  }),
  removeItem: jest.fn((key) => {
    delete global.localStorage[key];
  }),
};

describe("save", () => {
  it("saves a value to localStorage", () => {
    const theValue = 123;
    const theKey = "a key";

    save(theKey, theValue);

    expect(localStorage[theKey]).toEqual(JSON.stringify(theValue));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      theKey,
      JSON.stringify(theValue),
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
