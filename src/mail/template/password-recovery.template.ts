export const passwordRecoveryMail = ({ email, firstName }: any, recoveryLink) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: 'Password recovery',
  html: `
            <h3>Hello ${firstName ? firstName : email}!</h3>
            <p>Please use this <a href="${recoveryLink}">link</a> to recovery your password.</p>
        `
})