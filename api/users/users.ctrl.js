const createError = require('http-errors');
const User = require('../../models/user');
const History = require('../../models/history');

const read = async (req, res, next) => {
  try {
    const { owner } = req.params;
    const user = await User.findOne({ owner });
    if (!user) {
      throw new createError.NotFound(`${owner} not found.`);
    }

    res.json(user);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { owner } = req.params;
    const { score, emojiType, memo } = req.body;
    const updatedAt = Date.now();

    const user = await User.findOneAndUpdate({ owner }, { score, updatedAt });

    if (!user) {
      throw new createError.NotFound(`${owner} not found.`);
    }

    await History.create({
      owner,
      name: user.name,
      value: score - user.score,
      emojiType,
      memo
    });

    res.json({ ...user.toObject(), score, updatedAt });
  } catch (e) {
    next(e);
  }
};

module.exports = { read, update };
