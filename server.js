const http = require("http");
const app = require("./app");
const db = require("./src/db");
const port = process.env.PORT || "8080";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, function () {
  console.info(`Server is up and running on port ${port}`);
});
