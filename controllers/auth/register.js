const { User } = require('../../schemas/user')
const { sendResponse } = require('../../helpers')
const gravatar = require('gravatar')

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
  newUser.setDefaultAvatar(gravatar.url(newUser.email, { s: '200' }))
  await newUser.save()

  sendResponse({
    res,
    status: 201,
    statusMessage: 'Created',
    data: {
      message: 'Registration success',
      email: newUser.email,
      subscription: newUser.subscription,
    },
  })
}

module.exports = register
