exports.up = function(knex) {
    return knex.schema.createTable('favoris', function(table) {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable();
        table.integer('filmId').unsigned().notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.foreign('userId').references('id').inTable('user').onDelete('CASCADE');
        table.foreign('filmId').references('id').inTable('films').onDelete('CASCADE');

        table.unique(['userId', 'filmId']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('favoris');
};
