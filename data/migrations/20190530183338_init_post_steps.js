exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_steps', post_steps => {
    post_steps.increments();

    post_steps.integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    post_steps.integer('step_num')
      .notNullable();
    
    post_steps.string('title')
        .notNullable();
    
    post_steps.text('instruction')
        .notNullable()
        
    post_steps.string('img_url');

    post_steps.string('vid_url');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('post_steps');
};
