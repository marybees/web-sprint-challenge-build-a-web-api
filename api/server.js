const express = require("express");

const postsRouter = require("../project/projectRouter");

const userRouter = require("../action/actionRouter");

const server = express();

server.get("/", (req, res) => {
  res.status(200).json({
    Test: "endpoint",
  });
});

// global middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

// endpoints
server.use("../project/projectRouter", "../action/actionRouter", logger);

module.exports = server;
