const request = require("supertest");
const app = require("../src/app");

describe("Web App", () => {

  test("GET / should return index page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Hello World App");
  });

  test("POST /submit should return submitted message", async () => {
    const res = await request(app)
      .post("/submit")
      .send("message=Teste");

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Teste");
  });

});