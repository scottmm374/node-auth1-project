exports.up = async function(knex) {
  await knex.schema.createTable("user", table => {
    table.increments("id");
    table.string("userName").notNullable().unique;
    table.integer("age").notNullable();
    table.string("race").notNullable();
    table.string("class").notNullable();
    table.string("faction").notNullable();
    table.string("password").notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("user");
};
