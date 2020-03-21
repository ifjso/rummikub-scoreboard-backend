const History = require('../../models/history');

const list = async (req, res, next) => {
  try {
    const { from, to, skip, limit } = req.query;
    const query = makeCreatedAtQuery(from, to);
    const histories = await History.find(query)
      .skip(Number(skip))
      .limit(Number(limit));
    res.json(histories);
  } catch (e) {
    next(e);
  }
};

const count = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const query = makeCreatedAtQuery(from, to);
    const count = await History.count(query);
    res.json({ count });
  } catch (e) {
    next(e);
  }
};

const makeCreatedAtQuery = (from, to) => {
  const query = { createdAt: { $gte: 0 } };
  if (from) {
    Object.assign(query.createdAt, { $gte: Number(from) });
  }
  if (to) {
    Object.assign(query.createdAt, { $lte: Number(to) });
  }

  return query;
};

module.exports = { list, count };
