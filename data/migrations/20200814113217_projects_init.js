exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments("id");
      tbl.string("name", 256).notNullable();
      tbl.text("description");
      tbl.boolean("completed").defaultTo(false).notNullable();
    })
    .createTable("tasks", (tbl) => {
      tbl.increments("id");
      tbl.text("description").notNullable();
      tbl.text("notes");
      tbl.boolean("completed").defaultTo(false).notNullable();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("resources", (tbl) => {
      tbl.increments("id");
      tbl.string("name").notNullable().unique();
      tbl.text("description");
    })
    .createTable("project_resources", (tbl) => {
      tbl.increments("id");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resources.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropIfTableExists("project_resources")
    .dropIfTableExists("resources")
    .dropIfTableExists("tasks")
    .dropIfTableExists("projects");
};
