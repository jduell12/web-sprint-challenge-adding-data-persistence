const express = require("express");
const server = express();

const ProjectRouter = require("../projects/project-router");
const ResourceRouter = require("../resources/resources-router");
const TaskRouter = require("../tasks/tasks-router");

server.use(express.json());
server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);
server.use("/api/tasks", TaskRouter);

server.get("/", (req, res) => {
  res.status(200).json({ server: "working" });
});

module.exports = server;
