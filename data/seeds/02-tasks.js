exports.seed = function (knex) {
  return knex("tasks").insert([
    {
      id: 1,
      description: "fork the github repo",
      completed: false,
      project_id: 1,
    },
  ]);
};
