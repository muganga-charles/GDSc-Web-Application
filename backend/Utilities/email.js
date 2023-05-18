const path = require("path");
const ejs = require("ejs");
const sendgrid = require("@sendgrid/mail");
const dotenv = require("dotenv");


dotenv.config();

// class to handle sending of emails
class Email {
  recipients;
  constructor(recipients) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    this.recipients = recipients;
  }

  async sendMail(html, subject) {
    const msg = {
      to: this.recipients,
      from: 'mugangacharles5@gmail.com',
      subject: subject,
      html: html,
    };

    console.log("sending mail");
    await sendgrid.send(msg);
  }

  async sendConfirmEmail(lastName) {
    const subject = "Confirm Email";
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/email/confirmEmail.ejs"),
      {
        subject: subject,
        lastName: lastName,
      }
    );
    await this.sendMail(html, subject);
  }
}

module.exports = Email;