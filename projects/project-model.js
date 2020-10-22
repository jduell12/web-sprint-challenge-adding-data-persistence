const db = require("../data/db-config");

module.exports = {
  getProjects,
  getProjectById,
  getProjectResources,
  getProjectTasks,
  addProject,
  addResource,
  addTask,
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

//returns an array of tasks for a given project id
function getProjectTasks(id) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .where({ project_id: id })
    .select(
      "p.name as Project",
      "p.description as Description",
      "t.description as Task",
      "t.completed as Completed",
    );
}

//adds project to project table
function addProject(project) {
  return db("projects")
    .insert(project)
    .returning("id")
    .then((ids) => {
      const id = ids[0];
      return getProjectById(id);
    });
}

//adds resource to provided project id
function addResource(id, resource) {
  return db("resources")
    .insert(resource)
    .returning("id")
    .then((ids) => {
      const resource_id = ids[0];
      return db("project_resources")
        .insert({ project_id: id, resource_id: resource_id })
        .returning("ids")
        .then((ids) => {
          return getProjectResources(id);
        });
    });
}

//adds a task to the provided project id
function addTask(id, task) {
  return db("tasks")
    .insert(task)
    .where({ project_id: id })
    .returning("ids")
    .then((ids) => {
      return getProjectTasks(id);
    });
}
