const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  avatarURL: String,

  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
})

const joiUserSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
})

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.setDefaultAvatar = function (avatar) {
  this.avatarURL = avatar
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id,
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
}

const User = model('user', userSchema)

module.exports = { User, joiUserSchema, joiUserSubscriptionUpdateSchema }
