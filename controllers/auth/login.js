const { User } = require('../../schemas/user')
const { sendResponse } = require('../../helpers')

const login = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    sendResponse({
      res,
      status: 401,
      statusMessage: 'Unauthorized',
      data: { message: 'Email is wrong' },
    })
    return
  }

  const token = user.createToken()

  await User.findByIdAndUpdate(user._id, { token })

  sendResponse({
    res,
    status: 200,
    statusMessage: 'Login success',
    data: {
      token,
      user: { email: user.email, subscription: user.subscription },
    },
  })
}

module.exports = login
