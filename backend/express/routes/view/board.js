var router = require('express').Router();
var boardRepository = require('../../repositories/board');
var isLoggedIn = require('../../middleware/isLoggedIn');
var renderWithData = require('../../middleware/renderWithData');

router.get('/', isLoggedIn, renderWithData);

router.get('/:id', isLoggedIn, renderWithData);

router.get('/:id/task/:task_id', isLoggedIn, renderWithData);

module.exports = router;