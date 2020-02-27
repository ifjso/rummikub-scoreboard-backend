const History = require('../../models/history');
const User = require('../../models/user');

const write = async (req, res, next) => {
  try {
    const { owner, value } = req.body;
    const user = await User.findOne({ owner });
    if (!user) {
      throw new Error(`${owner} not found.`);
    }

    const history = await History.create({ owner, name: user.name, value });
    res.json(history);
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const { from, to, skip, limit } = req.query;

    const query = { createdAt: {} };
    if (from) {
      Object.assign(query.createdAt, { $gte: Number(from) });
    }
    if (to) {
      Object.assign(query.createdAt, { $lte: Number(to) });
    }

    const histories = await History.find(query)
      .skip(Number(skip))
      .limit(Number(limit));
    res.json(histories);
  } catch (e) {
    next(e);
  }
};

module.exports = { write, list };
