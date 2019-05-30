exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', tags => {
    tags.increments();

    tags.string('name')
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
