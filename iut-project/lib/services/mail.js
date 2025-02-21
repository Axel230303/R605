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
};
