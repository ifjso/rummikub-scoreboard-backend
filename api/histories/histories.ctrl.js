const History = require('../../models/history');

const list = async (req, res, next) => {
  try {
    const { from, to, skip, limit } = req.query;

    const query = { createdAt: { $gte: 0 } };
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

module.exports = { list };
