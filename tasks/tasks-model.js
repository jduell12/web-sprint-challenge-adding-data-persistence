const db = require("../data/db-config");

module.exports = {
  getAllTasks,
};

function getAllTasks() {
  return db("tasks");
}
