const { printMessage } = require("../src/app");

describe("printMessage", () => {

  test("should return formatted message", () => {
    const result = printMessage("Hello");
    expect(result).toBe("Message received: Hello");
  });

  test("should throw error if message is empty", () => {
    expect(() => printMessage()).toThrow("Message is required");
  });

});