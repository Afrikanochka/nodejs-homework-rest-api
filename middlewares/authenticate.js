const { User } = require('../schemas/user')
const jwt = require('jsonwebtoken')
const sendResponse = require('../helpers/sendResponse')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    const [bearer, token] = authorization.split(' ')

    if (bearer !== 'Bearer') {
      sendResponse({
        res,
        status: 401,
        statusMessage: 'Unauthorized',
        data: {
          message: 'Not authorized',
        },
      })
    }

    const { id } = jwt.verify(token, SECRET_KEY)

    const user = await User.findById(id)

    if (!user.token) {
      return sendResponse({
        res,
        status: 401,
        statusMessage: 'Unauthorized',
        data: {
          message: 'Not authorized',
        },
      })
    }
    req.user = user
    next()
  } catch (error) {
    return sendResponse({
      res,
      status: 401,
      statusMessage: 'Unauthorized',
      data: {
        message: 'Not authorized',
      },
    })
  }
}

module.exports = authenticate
