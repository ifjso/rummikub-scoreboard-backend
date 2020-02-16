const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  owner: Number,
  name: String,
  picture: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
});
UserSchema.index({ owner: 1 }, { unique: true });

module.exports = model('User', UserSchema);
