const express = require("express");
const server = express();

const ProjectRouter = require("../projects/project-router");

server.use(express.json());
server.use("/api/projects", ProjectRouter);

server.get("/", (req, res) => {
  res.status(200).json({ server: "working" });
});

module.exports = server;
