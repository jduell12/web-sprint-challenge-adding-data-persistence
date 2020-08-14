const db = require("../data/db-config");

module.exports = {
  getProjects,
  getProjectById,
  getProjectResources,
};

//returns an array of projects
function getProjects() {
  return db("projects");
}

//returns the first object of the projects array where the id matches the provided id
function getProjectById(id) {
  return db("projects").where({ id }).first();
}

//returns an array of resources for a given project id
function getProjectResources(id) {
  return db("project_resources as pr")
    .join("projects as p", "pr.project_id", "p.id")
    .where({ project_id: id })
    .join("resources as r", "pr.resource_id", "r.id")
    .select(
      "p.name as Project",
      "r.name as Resource",
      "r.description as Description",
    );
}
