const app = require("./app");

const PORT = process.env.PORT || 3000;

function startServer() {
  return app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };