const express = require('express');
const histories = require('./histories.ctrl');

const router = express.Router();

router.post('/', histories.write);
router.get('/', histories.list);

module.exports = router;
