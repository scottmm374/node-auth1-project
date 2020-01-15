exports.seed = async knex => {
  await knex("user").insert([
    {
      userName: "Shabena",
      age: 125,
      race: "Troll",
      class: "Hunter",
      faction: "Horde",
      password: "druidsSuck"
    },
    {
      userName: "Astira",
      age: 435,
      race: "Blood Elf",
      class: "Priest",
      faction: "Horde",
      password: "NightElvesSuck"
    }
  ]);
};
