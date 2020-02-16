const { Schema, model } = require('mongoose');

const ScoreSchema = new Schema({
  owner: Number,
  score: Number,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
});
ScoreSchema.index({ owner: 1 }, { unique: true });

module.exports = model('Score', ScoreSchema);
