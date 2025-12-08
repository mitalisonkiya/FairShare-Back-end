const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mitalisonkiya2005@gmail.com",
        pass: "vyye eqzn unqu jden"
    }
});

exports.sendEmailInvite = async (email, link) => {
    const htmlTemplate = `
    <h2>You are invited to join a FairShare group!</h2>
    <p>Click the link below to join:</p>
    <a href="${link}" style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Join Group</a>
    `;

    try {
        await transporter.sendMail({
            from: "FairShare App",
            to: email,
            subject: "FairShare Group Invite",
            html: htmlTemplate
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
