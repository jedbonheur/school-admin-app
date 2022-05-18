require("dotenv").config();
const nodemailer = require('nodemailer');
const path = require('path');



exports.generatePassword = () => {
  const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const pwdLen = 10;
  const password = Array(pwdLen).fill(pwdChars).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
  return password.toString()
}


exports.sendEmail = (receiver,subject,htmlMessage) => {
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD
  },
  rejectUnauthorized: false,
});

const mailOptions = {
  from: '24codingschool@gmail.com',
  to: receiver,
  subject: subject,
  html: htmlMessage,
  attachments: [{
        filename: 'image.png',
        path: path.join(__dirname, '../public/images/schoolAdminLogo.png'),
        cid: 'logo' //same cid value as in the html img src
    }]
};

transporter.sendMail(mailOptions, function(error, info){

});
}


exports.getMessage = (name,username,role,password,) => {
  const message = `<h1>Congratulations ${name}!</h1>
                   <p>Your registration has been approved as ${role}</p>
                   <p>Next thing is to go on and login with following credintials: </p>
                   <br/>
                   <br/>
                   <p><strong>Username: </strong> ${username} </p>
                   <p><strong>Password: </strong> ${password} </p>
                   <br/>
                   <br/>
                   <img src="cid:logo">
                   `

    return message
}