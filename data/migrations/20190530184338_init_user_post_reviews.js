exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_post_reviews', user_post_reviews => {
    user_post_reviews.increments();

    user_post_reviews.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    user_post_reviews.integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      
    user_post_reviews.integer('rating')
      .notNullable();

    user_post_reviews.text('review')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_post_reviews');
};