const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'idolife94@gmail.com',
        subject: 'Welcome to Task App!',
        text: `Hello ${name}!, We are excited to have you using the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'idolife94@gmail.com',
        subject: 'Goodbye from the Task App Team!',
        text: `Goodbye ${name}, We're sad to see you leave, hope to see you back soon! `
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}