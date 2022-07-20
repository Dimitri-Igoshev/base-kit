export const confirmationMail = ({ email, firstName }: any, confirmationLink) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: 'Account confirmation',
  html: `
            <h3>Hello ${firstName ? firstName : email}!</h3>
            <p>Please use this <a href="${confirmationLink}">link</a> to confirm your account.</p>
        `
})