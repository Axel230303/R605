'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/favoris',
        options: {
            tags: ['api'],
            auth: {mode: 'required'},
            validate: {
                payload: Joi.object({
                    userId: Joi.number().integer().required().min(1).description('ID de l\'utilisateur pour lequel ajouter le favori'),
                    filmId: Joi.number().integer().required().min(1).description('ID du film à ajouter aux favoris')
                })
            }
        },
        handler: async (request, h) => {
            try {
                const {favorisService} = request.services();
                const {userId, filmId} = request.payload;

                // Ajouter le film aux favoris de l'utilisateur spécifié
                await favorisService.addFavori(userId, filmId);
                return h.response({message: 'Film ajouté aux favoris'}).code(201);
            } catch (error) {
                console.error('Erreur lors de l\'ajout du film aux favoris :', error);
                return h.response({error: 'Erreur lors de l\'ajout aux favoris'}).code(500);
            }
        }
    },
    {
        method: 'DELETE',
        path: '/favoris/{filmId}',
        options: {
            tags: ['api'],
            auth: { mode: 'required' },
            validate: {
                params: Joi.object({
                    filmId: Joi.number().integer().required().min(1).description('ID du film à retirer des favoris')
                }),
                payload: Joi.object({
                    userId: Joi.number().integer().required().min(1).description('ID de l\'utilisateur pour lequel retirer le favori')
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { favorisService } = request.services();
                const { userId } = request.payload;  // Utilisateur spécifique
                const { filmId } = request.params;   // Film spécifique à retirer des favoris

                // Retirer le film des favoris de l'utilisateur spécifié
                await favorisService.removeFavori(userId, filmId);
                return h.response({ message: 'Film retiré des favoris' }).code(200);
            } catch (error) {
                console.error('Erreur lors du retrait du film des favoris :', error);
                return h.response({ error: 'Erreur lors du retrait des favoris' }).code(500);
            }
        }
    }
];
