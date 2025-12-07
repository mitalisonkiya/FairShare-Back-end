const nodemailer = require("nodemailer");

async function sendInviteEmail(toEmail) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mitalisonkiya2005@gmail.com",
            pass: "vyye eqzn unqu jden"   // NOT Gmail login password
        }
    });

    const mailOptions = {
        from: "mitalisonkiya2005.com",
        to: toEmail,
        subject: "FairShare Group Invite",
        text: "You have been invited to join the FairShare group!"
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendInviteEmail;
