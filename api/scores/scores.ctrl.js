const createError = require('http-errors');
const Score = require('../../models/score');
const User = require('../../models/user');
const History = require('../../models/history');

const read = async (req, res, next) => {
  try {
    const { owner } = req.params;

    const user = await User.findOne({ owner });
    if (!user) {
      throw new Error(`${owner} not found.`);
    }

    const score = await Score.findOne({ owner });
    if (!score) {
      throw new createError.NotFound(`${owner}'s score not found.`);
    }

    res.json({ ...score, user });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { owner } = req.params;
    const { score } = req.body;

    const user = await User.findOne({ owner });
    if (!user) {
      throw new Error(`${owner} not found.`);
    }

    const prevScore = await Score.findOneAndUpdate(
      { owner },
      { score, updatedAt: Date.now() }
    );

    if (!prevScore) {
      throw new createError.InternalServerError(
        `Failed to save ${owner}'s score.`
      );
    }

    await History.create({
      owner,
      name: user.name,
      value: score - prevScore.score
    });

    res.json(Object.assign(prevScore, { score }));
  } catch (e) {
    next(e);
  }
};

module.exports = { read, update };
