const express = require("express");

const projectRouter = require("../project/projectRouter");

const actionRouter = require("../action/actionRouter");

const server = express();

server.use(express.json());

// server.use(logger);

server.get("/", (req, res) => {
  res.status(200).json({
    Test: "endpoint",
  });
});

// // global middleware
// function logger(req, res, next) {
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
//       "Origin"
//     )}`
//   );
// }

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
