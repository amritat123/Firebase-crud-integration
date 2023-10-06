const http = require("http");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;

const server = http.createServer(app);
console.log(`Server started on port ${port}`);
server.listen(port);
