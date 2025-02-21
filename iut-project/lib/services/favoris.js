'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavorisService extends Service {

    async addFavori(userId, filmId) {
        const { Favoris, Film } = this.server.models();

        // Vérifier si le film existe
        const film = await Film.query().findById(filmId);
        if (!film) {
            console.error("Film non trouvé avec l'ID :", filmId);
            throw Boom.notFound('Film non trouvé');
        }

        // Vérifier si le film est déjà dans les favoris de l'utilisateur
        const existingFavori = await Favoris.query().findOne({ userId, filmId });
        if (existingFavori) {
            console.log("Le film est déjà dans les favoris pour l'utilisateur", userId);
            throw Boom.conflict('Ce film est déjà dans vos favoris');
        }

        // Ajouter le film aux favoris
        await Favoris.query().insert({ userId, filmId });
    }

    async removeFavori(userId, filmId) {
        const { Favoris } = this.server.models();

        console.log("Tentative de suppression du film avec ID:", filmId, "pour l'utilisateur ID:", userId);

        // Vérifier si le film est dans les favoris de l'utilisateur
        const favori = await Favoris.query().findOne({ userId, filmId });
        if (!favori) {
            console.error("Film non trouvé dans les favoris de l'utilisateur", userId);
            throw Boom.notFound('Film non trouvé dans vos favoris');
        }

        // Retirer le film des favoris
        await Favoris.query().delete().where({ userId, filmId });

        console.log("Film retiré des favoris avec succès pour l'utilisateur:", userId);
    }

};
