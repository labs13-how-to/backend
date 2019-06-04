exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_post_comments', user_post_comments => {
    user_post_comments.increments();

    user_post_comments.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    user_post_comments.integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    user_post_comments.text('comment')
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_post_comments');
};
