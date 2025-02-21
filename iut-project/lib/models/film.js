'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {
    static get tableName() {
        return 'films';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string().required().min(2).example('Inception'),
            description: Joi.string().required().min(10).example('Un film de science-fiction réalisé par Christopher Nolan.'),
            dateSortie: Joi.date().required().example('2010-07-16'),
            realisateur: Joi.string().required().example('Christopher Nolan'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }
};
