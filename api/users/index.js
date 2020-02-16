const express = require('express');
const users = require('./users.ctrl');

const router = express.Router();

router.get('/:owner', users.read);

module.exports = router;
