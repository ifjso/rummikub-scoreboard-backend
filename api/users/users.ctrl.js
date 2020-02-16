const createError = require('http-errors');
const User = require('../../models/user');

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

module.exports = { read };
