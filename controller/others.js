import nodemailer from 'nodemailer';
import "dotenv/config";
import User from '../service/schemas/user';

const {M_USER, M_PASS} = process.env;

export const subscribeNewsletter = async (req, res, next) => {

    const { email } = req.body;
    const user = await User.findOne({email});

    if (!email) {
        return res.status(400).send('Email is required');
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
        html: '<h3>Thank you for subscribing to our newsletter. You will receive an email once a week with information about the latest recipes, news on the site and healthy eating trends.<h3>'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
            res.status(500).send('Could not send verification email')
        } else {
            console.log("Message sent: %s", info.messageId);
            res.send('Email sent successfully');
        }
    });
};

export default subscribeNewsletter