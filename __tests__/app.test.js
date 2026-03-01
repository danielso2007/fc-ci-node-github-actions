const request = require("supertest");
const app = require("../src/app");

describe("POST /submit", () => {

  it("should return 200 and render message", async () => {
    const res = await request(app)
      .post("/submit")
      .send("message=Hello");

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<h1>Resultado</h1>");
    expect(res.text).toContain("<p>Hello</p>");
  });

  it("should escape HTML to prevent XSS", async () => {
    const malicious = "<script>alert(1)</script>";

    const res = await request(app)
      .post("/submit")
      .send(`message=${encodeURIComponent(malicious)}`);

    expect(res.statusCode).toBe(200);

    // Não deve conter script executável
    expect(res.text).not.toContain("<script>");
    expect(res.text).toContain("&lt;script&gt;");
  });

  it("should return 400 when message is too long", async () => {
    const longMessage = "a".repeat(501);

    const res = await request(app)
      .post("/submit")
      .send(`message=${longMessage}`);

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Message too long");
  });

  it("should handle missing message field", async () => {
    const res = await request(app)
      .post("/submit")
      .send("");

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<p></p>");
  });

});