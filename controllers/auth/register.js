const { User } = require('../../schemas/user')
const { sendResponse, sendEmail } = require('../../helpers')
const gravatar = require('gravatar')

const { PORT } = process.env

const register = async (req, res) => {
  const { email, password } = req.body

  const result = await User.findOne({ email })

  if (result) {
    sendResponse({
      res,
      status: 409,
      statusMessage: 'Conflict',
      data: { message: 'Already register' },
    })
    return
  }

  const newUser = new User({ email })

  newUser.setPassword(password)
  newUser.setVerifyToken()
  newUser.setDefaultAvatar(gravatar.url(newUser.email, { s: '200' }))
  const { verifyToken } = await newUser.save()

  const data = {
    to: email,
    subject: 'Email verification',
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verifyToken}" 
    target="_blank">Verificate email</a>`
  }
  await sendEmail(data)

  sendResponse({
    res,
    status: 201,
    statusMessage: 'Created',
    data: {
      message: 'Registration success',
      email: newUser.email,
      subscription: newUser.subscription,
      verifyToken: verifyToken,
    },
  })
}

module.exports = register
