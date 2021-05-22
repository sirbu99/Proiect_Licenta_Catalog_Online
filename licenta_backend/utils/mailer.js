const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function send(to, subject, text) {
    const message = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
    };

    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

module.exports = {
    send,
};