describe("Server bootstrap", () => {

  it("should call startServer when executed directly", () => {
    jest.resetModules();

    const mockListen = jest.fn((port, cb) => cb());

    jest.doMock("../src/app", () => ({
      listen: mockListen
    }));

    const originalMain = require.main;
    const fakeModule = { filename: require.resolve("../src/server") };

    require.main = fakeModule;

    require("../src/server");

    require.main = originalMain;
  });

});