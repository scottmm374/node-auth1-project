exports.seed = async knex => {
  await knex("user").truncate();
};
