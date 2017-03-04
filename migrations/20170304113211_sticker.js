exports.up = function(knex, Promise) {
  return knex.schema.createTable('sticker', (table) =>{
    table.increments();
    table.text('image_url').notNullable();
    table.text('name').notNullable();
    table.integer('user_id').unsigned().references('user.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sticker')
};
