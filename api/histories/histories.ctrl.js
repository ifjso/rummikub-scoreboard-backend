const History = require('../../models/history');

const list = async (req, res, next) => {
  try {
    let { page = 1, per_page: perPage = 30 } = req.query;
    page = Number(page);
    perPage = Number(perPage);

    const historyCount = await History.count();
    const histories = await History.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    const pageCount = Math.trunc((historyCount - 1) / perPage) + 1;
    res.json({ histories, hasNextPage: pageCount > page });
  } catch (e) {
    next(e);
  }
};

module.exports = { list };
