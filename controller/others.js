import nodemailer from 'nodemailer';
import "dotenv/config";
import User from '../service/schemas/user.js';

const {M_USER, M_PASS} = process.env;

export const subscribeNewsletter = async (req, res, next) => {

    const { email } = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: 'Wrong email'});
        }

        if(user.subscribe) {
            return res.status(400).json({message: 'You already subscribe to our newsletter'});
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.mailgun.org",
            port: 587,
            secure: false,
            auth: {
            user: M_USER,
            pass: M_PASS
            },
        });

        const mailOptions = {
            from: '"So-Yummy Team" <so-yummy@gmail.com>',
            to: email,
            subject: 'Newsletter subscription',
            html: '<h3>Thank you for subscribing to our newsletter. You will receive an email once a week with information about the latest recipes, news on the site and healthy eating trends.</h3>'
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err)
                res.status(500).send('Could not send email')
            } else {
                console.log("Message sent: %s", info.messageId);
                res.send('Email sent successfully');
            }
        });

        user.subscribe = true;
        await user.save();

    } catch(err) {
        next(err)
    }
};

export default subscribeNewsletter;