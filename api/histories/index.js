const express = require('express');
const histories = require('./histories.ctrl');

const router = express.Router();

router.get('/', histories.list);
router.get('/count', histories.count);

module.exports = router;
