const { Schema, model } = require('mongoose')

const avatarSchema = Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

const Avatar = model('avatar', avatarSchema)

module.exports = Avatar
