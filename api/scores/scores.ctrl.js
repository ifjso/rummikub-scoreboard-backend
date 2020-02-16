const createError = require('http-errors');
const Score = require('../../models/score');

const read = async (req, res, next) => {
  try {
    const { owner } = req.params;
    const score = await Score.findOne({ owner });
    if (!score) {
      throw new createError.NotFound(`${owner}'s score not found.`);
    }

    res.json(score);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { owner } = req.params;
    const { score } = req.body;
    const prevScore = await Score.findOneAndUpdate(
      { owner },
      { score, updatedAt: Date.now() }
    );

    if (!prevScore) {
      throw new createError.InternalServerError(
        `Failed to save ${owner}'s score.`
      );
    }

    res.json(Object.assign(prevScore, { score }));
  } catch (e) {
    next(e);
  }
};

module.exports = { read, update };
