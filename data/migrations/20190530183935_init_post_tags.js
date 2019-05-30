
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_tags', post_tags => {
    post_tags.increments();

    post_tags.integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

      post_tags.integer('tag_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tags')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('post_tags');
};
