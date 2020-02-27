const { Schema, model } = require('mongoose');

const HistorySchema = new Schema({
  owner: Number,
  name: String,
  value: Number,
  createdAt: { type: Number, default: Date.now }
});
HistorySchema.index({ createdAt: -1 }, { unique: true });

module.exports = model('History', HistorySchema);
