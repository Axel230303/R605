'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmService extends Service {

    async create(film) {
        const { Film } = this.server.models();
        return await Film.query().insertAndFetch(film);
    }

    async update(id, filmData) {
        const { Film } = this.server.models();
        const film = await Film.query().findById(id);

        if (!film) {
            throw Boom.notFound('Film non trouvé.');
        }

        return await Film.query().patchAndFetchById(id, filmData);
    }

    async delete(id) {
        const { Film } = this.server.models();
        const deleted = await Film.query().deleteById(id);

        if (!deleted) {
            throw Boom.notFound('Film non trouvé.');
        }

        return { message: "Film supprimé avec succès" };
    }

    async getAll() {
        const { Film } = this.server.models();
        return await Film.query();
    }
};
