const db = require("../data/db-config");

module.exports = {
  getAllTasks,
};

/*
    select t.description, t.completed, p.name, p.description As Project
FROM tasks as t
JOIN projects as p 
WHERE t.project_id = p.id;

*/
function getAllTasks() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select(
      "t.description as Task",
      "t.completed as Completed",
      "t.notes as Notes",
      "p.name as Project",
      "p.description as Project_Description",
    );
}
