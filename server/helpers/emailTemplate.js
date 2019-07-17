/**
 * @description creates template for sending emails
 * @returns object of temapltes for sending emails;
 */
const emailTemplate = {
  verification: {
    from: {
      email: 'no-reply@ibudget.com',
    },
    subject: 'Email Verification',
    text: 'Verify your Email at iBudget.com',
    html: `
        <h1 style="color: #6C54EC"> Welcome to iBudget.com</h1>
        <p style="color:black">Thank you for signing up
        for an author's haven account
        please click on the button to verify your email address</p>
        `,
  },
  welcome: {
    from: {
      email: 'no-reply@ibudget.com',
    },
    subject: 'Authors Haven account created',
    text: 'Thank you for creating an account at iBudget.com',
    html: `
        <h1 style="color: #6C54EC"> Welcome to iBudget.com</h1>
        Log in into your account to start contributing.
         `,
  },
  expiredToken: {
    from: {
      email: 'no-reply@ibudget.com',
    },
    subject: 'Expired Token',
    text: 'The token you attempt to verify your account with has expired',
    html: `
        <h1 style="color: #6C54EC"> Welcome to iBudget.com</h1>
        You are receiving this mail because you made attempt to verify your
        account with expired credentials. Kindly click the link
        below to verify your account.
         `,
  },
  confirmation: {
    from: {
      email: 'no-reply@ibudget.com',
    },
    subject: 'Account successfully confirmed',
    text: 'Thank you for confirming your account at Autho\'r Haven',
    html: `
        < h1 style = "color: #6C54EC" > Welcome to iBudget.com </h1>
        <p>'Thank you for confirming your account at Author Haven'</p>
        Log in into your account to start contributing.
         `,
  },
  resetPassword: {
    from: {
      email: 'no-reply@ibudget.com',
    },
    subject: 'Please Reset Password',
    text: 'Reset Password at iBudget.com',
    html: `
        < h1 style = "color: #6C54EC" > iBudget.com </h1>
        < p > 'You requested to reset your iBudget.com password.' </p>
        <p>'Please click on the button below within 
        the next 30 minute to reset your password:'</p>
         `,
  },
};

export default emailTemplate;
