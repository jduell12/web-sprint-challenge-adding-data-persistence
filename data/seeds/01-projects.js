exports.seed = function (knex) {
  return knex("projects").insert([
    {
      id: 1,
      name: "Complete Sprint",
      description:
        "Complete the adding data persistence sprint challenge to move on to the next week",
      completed: false,
    },
  ]);
};
