exports.seed = async knex => {
  await knex("users").insert([
    {
      username: "Shabena",
      password: "druidsSuck"
    },
    {
      username: "Astira",
      password: "NightElvesSuck"
    }
  ]);
};
