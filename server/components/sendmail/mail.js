/*
 * Send mail component
 */
'use strict';

import nodemailer from 'nodemailer';

exports.sendMailUserConfirmed = (userName) => {

    var transporter = nodemailer.createTransport();

    transporter.sendMail({
        from: 'a.lopez.sanchez@udc.es',
        to: 'alopezsanchez18@gmail.com',
        subject: `Confirmación de registro de ${userName}`,
        html: `Hola.
                Se informa que el usuario <b>${userName}</b> ha completado su registro correctamente.`,
        text: `Hola.
                Se informa que el usuario ${userName} ha completado su registro correctamente.`
    });
}

exports.sendConfirm = (userName, mail, link) => {
    console.log(userName);
    console.log(mail);
    console.log(link);
    
    var transporter = nodemailer.createTransport();

    var mailOptions = {
        from: 'a.lopez.sanchez@udc.es',
        to: mail,
        subject: `Confirmación de registro en AGFA`,
        html: `Hola ${userName}.
                Accede al siguiente enlace o cópialo en tu navegador para completar tu registro en AGFA:
                <a href="${link}">${link}</a>`,
        text: `Hola ${userName}.
                Accede al siguiente enlace o cópialo en tu navegador para completar tu registro en AGFA:
                ${link}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}
