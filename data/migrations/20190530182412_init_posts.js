exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', posts => {
    posts.increments();

    posts.string('title')
      .notNullable();
    
    posts.string('img_url')
      .notNullable();

    posts.text('description')
      .notNullable();
    
    posts.enu('difficulty',
      ['easy', 'intermediate', 'advanced', 'professional'],
      { useNative: true, enumName: 'difficulty' })
      .notNullable();

    posts.string('duration')
        .notNullable();

    posts.text('skills');

    posts.text('supplies');

    posts.integer('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    posts.timestamp('created_at', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
