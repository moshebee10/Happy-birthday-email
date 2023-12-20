const amqplib = require('amqplib');
const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()
const personsArray = require('../data');
const tools = require('../tools/datesTools');
const AUTH = require('../conf/gmailConf');

/**
 * @swagger
 * /birth/get_birth_date:
 *   get:
 *     summary: Get list of birthdays in the current week
 *     description: Returns a list of birthdays that occur in the current week.
 *     responses:
 *       200:
 *         description: Successful operation. Returns the list of birthdays.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                   birthdayMessage:
 *                     type: string
 *                   id:
 *                     type: number
 *     tags:
 *       - Birth
 */

router.get('/get_birth_date', (req, res) => {
    const arr = personsArray.filter(elm => tools.checkCurrentWeek(elm.birthDate));
    res.send(arr);
});

/**
 * @swagger
 * /birth/set_birth_blessing:
 *   post:
 *     summary: Send birthday blessings
 *     description: Sends birthday blessings via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               birthdayMessage:
 *                 type: string
 *               id:
 *                 type: number
 *             required:
 *               - email
 *               - message
 *     responses:
 *       200:
 *         description: Successful operation. Email sent successfully.
 *       400:
 *         description: Bad request. Missing required parameters.
 *     tags:
 *       - Birth
 */

router.post('/set_birth_blessing', (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: AUTH
    });

    (async () => {
        const queue = 'sendMail';
        const conn = await amqplib.connect('amqp://localhost');

        const ch1 = await conn.createChannel();
        await ch1.assertQueue(queue);

        // Listener
        ch1.consume(queue, (msg) => {
            if (msg !== null) {
                let userDetails = JSON.parse(msg.content.toString());
                let mailOptions = {
                    from: AUTH.user,
                    to: userDetails.email,
                    subject: 'Happy birthday !!!',
                    text: userDetails.birthdayMessage
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                ch1.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        });

        // Sender
        const ch2 = await conn.createChannel();
        ch2.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));

        res.send('OK');
    })();
})
module.exports = router