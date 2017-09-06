/*
 * Send mail component
 */
'use strict';

import nodemailer from 'nodemailer';
import config from '../../config/environment';

exports.sendMailUserConfirmed = (userName) => {

	var transporter = nodemailer.createTransport(config.mailTransport);

	var mailOptions = {
		from: `"Asociación Gallega de Fútbol Americano" <${config.from}>`,
		to: config.adminEMail,
		subject: `Confirmación de registro de ${userName}`,
		html: `Hola.\n
                Se informa que el usuario <b>${userName}</b> ha completado su registro correctamente.`,
		text: `Hola.\n
                Se informa que el usuario ${userName} ha completado su registro correctamente.`
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return console.error(error);
		}
		transporter.close();
	});
}

exports.sendConfirm = (userName, mail, link) => {

  var transporter = nodemailer.createTransport(config.mailTransport);

	var mailOptions = {
		from: '"Asociación Gallega de Fútbol Americano" <no-reply-agfa@agfa.gal>',
		to: mail,
		subject: `Confirmación de registro en AGFA`,
		html: `<p>Hola <b>${userName}</b>.</p>
		<p>Se te ha dado de alta como usuario en AGFA, pero para poder iniciar sesión
		antes debes proporcionar una serie de datos.</p>
                <p>Accede al siguiente enlace o cópialo en tu navegador para completar tu registro:
                \n<a href="${link}">${link}</a></p>`,
		text: `Hola ${userName}.\n
                Accede al siguiente enlace o cópialo en tu navegador para completar tu registro:
                \n${link}`
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			return console.error(error);
		}
		transporter.close();
	});
}
