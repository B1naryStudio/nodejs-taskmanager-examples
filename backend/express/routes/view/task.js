var router = require('express').Router();
var taskRepository = require('../../repositories/task');
var isLoggedIn = require('../../middleware/isLoggedIn');
var renderWithData = require('../../middleware/renderWithData');

router.get('/', isLoggedIn, renderWithData);

router.get('/:id', isLoggedIn, renderWithData);

module.exports = router;