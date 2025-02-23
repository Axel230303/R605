'use strict';

const Joi = require('joi');
const MessageBroker = require('../services/messageBroker');

module.exports = [
    {
        method: 'POST',
        path: '/films',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                payload: Joi.object({
                    titre: Joi.string().required(),
                    description: Joi.string().required(),
                    dateSortie: Joi.date().required(),
                    realisateur: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.create(request.payload);
        }
    },
    {
        method: 'PATCH',
        path: '/films/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1).description("ID du film")
                }),
                payload: Joi.object({
                    titre: Joi.string().min(2).example('Inception').description("Titre du film"),
                    description: Joi.string().example("Un film de SF").description("Description du film"),
                    dateSortie: Joi.date().iso().example('2010-07-16').description("Date de sortie"),
                    realisateur: Joi.string().example("Christopher Nolan").description("Réalisateur du film")
                }).min(1)
            }
        },
        handler: async (request, h) => {
            try {
                const { filmService } = request.services();
                return await filmService.update(request.params.id, request.payload);
            } catch (error) {
                console.error("Erreur lors de la mise à jour du film :", error);
                return h.response({ error: 'Erreur lors de la mise à jour du film' }).code(500);
            }
        }
    },
    {
        method: 'DELETE',
        path: '/films/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1).description("ID du film")
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { filmService } = request.services();
                return await filmService.delete(request.params.id);
            } catch (error) {
                console.error("Erreur lors de la suppression du film :", error);
                return h.response({ error: 'Erreur lors de la suppression du film' }).code(500);
            }
        }
    },
    {
        method: 'GET',
        path: '/films',
        options: {
            tags: ['api'],
            auth: { mode: 'optional' }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.getAll();
        }
    },
    {
        method: 'POST',
        path: '/films/export',
        options: {
            tags: ['api'],
            auth: {scope: ['admin']},
            handler: async (request, h) => {
                try {
                    const {filmService} = request.services();
                    const filePath = await filmService.exportFilmsToCSV();

                    // Utiliser directement MessageBroker.sendMessage
                    await MessageBroker.sendMessage('csv_exports', {filePath, email: request.auth.credentials.email});

                    return h.response({message: "Export en cours. Vous recevrez un email sous peu."}).code(202);
                } catch (error) {
                    console.error("Erreur lors de l'export :", error);
                    return h.response({error: "Erreur lors de l'export des films."}).code(500);
                }
            }
        }
    }
];
