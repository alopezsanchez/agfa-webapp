/*
 * Send mail component
 */
'use strict';

import nodemailer from 'nodemailer';
import config from '../../config/environment';

exports.sendMailUserConfirmed = (userName) => {

	var transporter = nodemailer.createTransport('smtps://alopezsanchez18%40gmail.com:zxkcvjfvbdoxkddd@smtp.gmail.com');

	transporter.sendMail({
		from: '"Asociación Gallega de Fútbol Americano" <no-reply-agfa@agfa.gal>',
		to: config.adminMail,
		subject: `Confirmación de registro de ${userName}`,
		html: `Hola.\n
                Se informa que el usuario <b>${userName}</b> ha completado su registro correctamente.`,
		text: `Hola.\n
                Se informa que el usuario ${userName} ha completado su registro correctamente.`
	});
}

exports.sendConfirm = (userName, mail, link) => {

  var transporter = nodemailer.createTransport('smtps://alopezsanchez18%40gmail.com:zxkcvjfvbdoxkddd@smtp.gmail.com');

	var mailOptions = {
		from: '"Asociación Gallega de Fútbol Americano" <no-reply-agfa@agfa.gal>',
		to: mail,
		subject: `Confirmación de registro en AGFA`,
		html: `Hola ${userName}.\n
                Accede al siguiente enlace o cópialo en tu navegador para completar tu registro en AGFA:
                \n<a href="${link}">${link}</a>`,
		text: `Hola ${userName}.\n
                Accede al siguiente enlace o cópialo en tu navegador para completar tu registro en AGFA:
                \n${link}`
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
		//transporter.close();
	});
}
