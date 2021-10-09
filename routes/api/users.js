const express = require('express')
const router = express.Router()

const subscription = require('../../controllers/users/subscription')
const userInfo = require('../../controllers/users/userInfo')
const updateAvatar = require('../../controllers/users/updateAvatar')
const verification = require('../../controllers/users/verification')
const reVerification = require('../../controllers/users/reVerification')

const authenticate = require('../../middlewares/authenticate')
const upload = require('../../middlewares/upload')
const validation = require('../../middlewares/validation')

const controllerWrapper = require('../../controllers/controllerWrapper')
const { joiUserSubscriptionUpdateSchema, joiUserVerificationRequestSchema } = require('../../schemas/user')

router.patch(
  '/',
  authenticate,
  validation(joiUserSubscriptionUpdateSchema),
  controllerWrapper(subscription)
)

router.post('/current', controllerWrapper(userInfo))

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(updateAvatar)
)

router.get('/verify/:verifyToken', controllerWrapper(verification))

router.post(
  '/verify',
  validation(joiUserVerificationRequestSchema),
  controllerWrapper(reVerification)
)

module.exports = router
