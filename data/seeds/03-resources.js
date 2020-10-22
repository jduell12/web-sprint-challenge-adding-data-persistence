exports.seed = function (knex) {
  return knex("resources").insert([
    {
      id: 1,
      name: "laptop",
      description:
        "Access to the internet and an integrated development environment",
    },
  ]);
};
