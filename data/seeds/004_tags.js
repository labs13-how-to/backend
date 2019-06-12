
exports.seed = async function (knex, Promise) {
  return knex.raw("TRUNCATE TABLE tags RESTART IDENTITY CASCADE")
    .then(function () {
      return knex('tags').insert([
        {
          id: 1,
          name: 'Art',
        },
        {
          id: 2,
          name: 'Apparel',
        },
        {
          id: 3,
          name: 'Appliances',
        },
        {
          id: 4,
          name: 'Automotive',
        },
        {
          id: 5,
          name: 'Baby',
        },
        {
          id: 6,
          name: 'Beauty',
        },
        {
          id: 7,
          name: 'Cooking',
        },
        {
          id: 8,
          name: 'Crafts',
        },
        {
          id: 9,
          name: 'Electronics',
        },
        {
          id: 10,
          name: 'Furniture',
        },
        {
          id: 11,
          name: 'Gardening',
        },
        {
          id: 12,
          name: 'Home Improvement',
        },
        {
          id: 13,
          name: 'Outdoors',
        },
        {
          id: 14,
          name: 'Pets',
        },
        {
          id: 15,
          name: 'Toys',
        },

      ]);
    });
};
