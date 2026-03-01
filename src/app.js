const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../views")));

app.post("/submit", (req, res) => {
  const message = req.body.message || "";
  res.send(`
    <html>
      <body>
        <h1>Resultado</h1>
        <p>${message}</p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

module.exports = app;