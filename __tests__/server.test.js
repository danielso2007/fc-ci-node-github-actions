const { startServer } = require("../src/server");

describe("Server", () => {

  let server;

  afterEach((done) => {
    if (server && server.close) {
      server.close(done);
    } else {
      done();
    }
  });

  it("should start server on port 3000", (done) => {
    server = startServer();

    server.on("listening", () => {
      const address = server.address();
      expect(address.port).toBe(3000);
      done();
    });
  });

});