const { sendResponse } = require('../../helpers')

const userInfo = (req, res) => {
  sendResponse({
    data: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  })
}

module.exports = userInfo
