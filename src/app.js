const express = require("express");
const path = require("path");
const escapeHtml = require("escape-html");

const app = express();
app.disable("x-powered-by");

// Parse seguro para form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "../views")));

app.post("/submit", (req, res) => {
  const rawMessage =
    typeof req.body.message === "string"
      ? req.body.message
      : "";

  // Limite defensivo opcional
  if (rawMessage.length > 500) {
    return res.status(400).type("text/plain").send("Message too long");
  }

  // Escapa caracteres perigosos
  const safeMessage = escapeHtml(rawMessage);

  res
    .status(200)
    .type("html")
    .send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Resultado</title>
        </head>
        <body>
          <h1>Resultado</h1>
          <p>${safeMessage}</p>
          <a href="/">Voltar</a>
        </body>
      </html>
    `);
});

module.exports = app;