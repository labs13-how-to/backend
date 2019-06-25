exports.seed = function (knex, Promise) {
  return knex.raw("TRUNCATE TABLE tags RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("tags").insert([
        { name: "Art" },
        { name: "Apparel" },
        { name: "Appliances" },
        { name: "Automotive" },
        { name: "Baby" },
        { name: "Beauty" },
        { name: "Cooking" },
        { name: "Crafts" },
        { name: "Electronics" },
        { name: "Furniture" },
        { name: "Gardening" },
        { name: "Home Improvement" },
        { name: "Outdoors" },
        { name: "Pets" },
        { name: "Toys" },
      ]);
    });
};

