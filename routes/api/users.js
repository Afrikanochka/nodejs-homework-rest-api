const express = require('express')
const router = express.Router()

const subscription = require('../../controllers/users/subscription')
const userInfo = require('../../controllers/users/userInfo')
const updateAvatar = require('../../controllers/users/updateAvatar')

const authenticate = require('../../middlewares/authenticate')
const upload = require('../../middlewares/upload')
const validation = require('../../middlewares/validation')

const controllerWrapper = require('../../controllers/controllerWrapper')
const { joiUserSubscriptionUpdateSchema } = require('../../schemas/user')

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

module.exports = router
