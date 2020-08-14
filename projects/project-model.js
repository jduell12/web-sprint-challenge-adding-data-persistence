const db = require("../data/db-config");

module.exports = {
  getProjects,
  getProjectById,
};

//returns an array of projects
function getProjects() {
  return db("projects");
}

//returns the first object of the projects array where the id matches the provided id
function getProjectById(id) {
  return db("projects").where({ id }).first();
}
