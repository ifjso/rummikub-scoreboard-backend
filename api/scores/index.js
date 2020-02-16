const express = require('express');
const scores = require('./scores.ctrl');

const router = express.Router();

router.get('/:owner', scores.read);
router.patch('/:owner', scores.update);

module.exports = router;
