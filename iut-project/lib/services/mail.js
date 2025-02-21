'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    constructor(...args) {
        super(...args);

        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendWelcomeEmail(email, firstName) {
        try {
            const info = await this.transporter.sendMail({
                from: '"TWO Piece" <no-reply@two-piece.com>',
                to: email,
                subject: "Bienvenue sur TWO Piece !",
                text: `Bonjour ${firstName},\n\nBienvenue sur notre TWO Piece ! Nous sommes ravis de vous avoir parmi nous.\n`,
                html: `<p>Bonjour <strong>${firstName}</strong>,</p><p>Bienvenue sur notre TWO Piece ! Nous sommes ravis de vous avoir parmi nous.</p><p>Cordialement,<br>TWO Piece</p>`
            });

            console.log(`E-mail envoyé : ${info.messageId}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    }

    async sendNewMovie(email, firstName) {
        try {
            const info = await this.transporter.sendMail({
                from: '"TWO Piece" <no-reply@two-piece.com>',
                to: email,
                subject: "Nouveau Film !!!!!!!!",
                text: `Bonjour ${firstName},\n\nUn nouveau film est dans la place\n`,
                html: `<p>Bonjour <strong>${firstName}</strong>,</p><p>Nous avons l'honneur de vous contacter pour vous dire qu'un nouveau film est sorti !!!</p><p>Cordialement,<br>TWO Piece</p>`
            });

            console.log(`E-mail envoyé : ${info.messageId}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    }

    async modifyFavorite(email, firstName) {
        try {
            const info = await this.transporter.sendMail({
                from: '"TWO Piece" <no-reply@two-piece.com>',
                to: email,
                subject: "Un film dans vos favoris a été modifié",
                text: `Bonjour ${firstName},\n\nUn film que vous aviez en favori a été modifié\n`,
                html: `<p>Bonjour <strong>${firstName}</strong>,</p><p>Nous avons supprimé un film que vous aviez en favori.</p><p>Cordialement,<br>TWO Piece</p>`
            });

            console.log(`E-mail envoyé : ${info.messageId}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    }

    async deleteFavorite(email, firstName) {
        try {
            const info = await this.transporter.sendMail({
                from: '"TWO Piece" <no-reply@two-piece.com>',
                to: email,
                subject: "Un film dans vos favoris a été supprimé",
                text: `Bonjour ${firstName},\n\nUn film que vous aviez en favori a été supprimé\n`,
                html: `<p>Bonjour <strong>${firstName}</strong>,</p><p>Nous avons supprimé un film que vous aviez en favori</p><p>Cordialement,<br>TWO Piece</p>`
            });

            console.log(`E-mail envoyé : ${info.messageId}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    }
};
