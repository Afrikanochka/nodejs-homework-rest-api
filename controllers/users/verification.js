const sendResponse = require('../../helpers/sendResponse')
const { User } = require('../../schemas/user')

const verification = async (req, res) => {
  const { verifyToken } = req.params

  const user = await User.findOne({ verifyToken })

  if (!user) {
    return sendResponse({
      res,
      status: 404,
      statusMessage: 'Not Found',
      data: {
        message: 'User not found'
      }
    })
  }

  await User.findByIdAndUpdate(user._id, {
    verifyToken: null,
    isVerified: true
  })

  sendResponse({
    res,
    status: 200,
    data: {
      message: 'Verification successful'
    }
  })
}

module.exports = verification
