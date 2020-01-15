exports.seed = async knex => {
  await knex("users").insert([
    {
      userName: "Shabena",
      password: "druidsSuck"
    },
    {
      userName: "Astira",
      password: "NightElvesSuck"
    }
  ]);
};
