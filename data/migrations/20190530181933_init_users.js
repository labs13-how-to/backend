exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username')
      .notNullable()
      .unique();

    users.string('password')
      .notNullable();
    
    users.timestamp('created_at', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
