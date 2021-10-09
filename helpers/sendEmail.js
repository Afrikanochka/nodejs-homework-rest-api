const sgMail = require('@sendgrid/mail')
const { sendResponse } = require('./sendResponse')

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: SENDGRID_EMAIL }
    const result = await sgMail.send(email)
    return result
  } catch (error) {
    sendResponse({
      status: 400,
      statusMessage: 'Bad Request',
      data: {
        message: 'Verification has already been passed',
        error
      }
    })
  }
}

module.exports = sendEmail
