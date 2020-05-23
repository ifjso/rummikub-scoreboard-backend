const History = require('../../models/history');
const User = require('../../models/user');

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
    const users = await User.find();
    histories.forEach(history => {
      const user = users.find(user => user.owner === history.owner);
      Object.assign(history, { name: user.name });
    });

    const pageCount = Math.trunc((historyCount - 1) / perPage) + 1;
    res.json({ histories, hasNextPage: pageCount > page });
  } catch (e) {
    next(e);
  }
};

module.exports = { list };
