'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmService extends Service {

    // Fonction de création de film
    async create(film) {
        const { Film } = this.server.models();
        const { mailService, favorisService, userService } = this.server.services();  // Récupérer les services nécessaires

        // Création du film
        const newFilm = await Film.query().insertAndFetch(film);

        // Envoi de l'e-mail pour le nouveau film
        const users = await userService.findAll();  // Récupérer tous les utilisateurs
        const emailPromises = users.map(user => {
            return mailService.sendNewMovie(user.email, user.firstName);  // Envoyer l'e-mail à chaque utilisateur
        });

        // Attendre que tous les e-mails soient envoyés
        await Promise.all(emailPromises);

        return newFilm;
    }

    // Fonction de mise à jour du film
    async update(id, filmData) {
        const { Film } = this.server.models();
        const { mailService, favorisService } = this.server.services();

        // Vérifier si le film existe
        const film = await Film.query().findById(id);
        if (!film) {
            throw Boom.notFound('Film non trouvé.');
        }

        // Mettre à jour le film
        const updatedFilm = await Film.query().patchAndFetchById(id, filmData);

        // Récupérer les utilisateurs ayant ce film en favoris via getFavorisByFilmId
        const favoris = await favorisService.getFavorisByFilmId(id);

        // Vérification si des favoris sont bien retournés
        if (!favoris || favoris.length === 0) {
            console.error('Aucun favori trouvé pour ce film');
            return { message: 'Film mis à jour, mais aucun utilisateur avec ce film en favoris' };
        }

        const emailPromises = favoris.map(favori => {
            const favoriData = favori.toJSON ? favori.toJSON() : favori;

            // Vérifier que chaque favori contient un utilisateur avec un email
            if (favoriData.firstName && favoriData.email) {
                return mailService.modifyFavorite(favoriData.email, favoriData.firstName);
            } else {
                console.error('Utilisateur sans email dans les favoris', favoriData);
                return Promise.resolve();
            }
        });

        await Promise.all(emailPromises);

        return updatedFilm;
    }

    // Fonction de suppression du film
    async delete(id) {
        const { Film } = this.server.models();
        const { mailService, favorisService, userService } = this.server.services();

        // Vérifier si le film existe
        const film = await Film.query().findById(id);
        if (!film) {
            throw Boom.notFound('Film non trouvé.');
        }

        // Récupérer les utilisateurs ayant ce film en favoris
        const favoris = await favorisService.getFavorisByFilmId(id);

        const emailPromises = favoris.map(favori => {
            const favoriData = favori.toJSON ? favori.toJSON() : favori;

            // Vérifier que chaque favori contient un utilisateur avec un email
            if (favoriData.firstName && favoriData.email) {
                return mailService.deleteFavorite(favoriData.email, favoriData.firstName);
            } else {
                console.error('Utilisateur sans email dans les favoris', favoriData);
                return Promise.resolve();
            }
        });

        // Attendre que tous les e-mails soient envoyés
        await Promise.all(emailPromises);

        // Supprimer le film
        await Film.query().deleteById(id);

        return { message: "Film supprimé avec succès" };
    }

    // Fonction pour récupérer tous les films
    async getAll() {
        const { Film } = this.server.models();
        return await Film.query();
    }
};