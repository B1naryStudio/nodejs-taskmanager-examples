var boardService = require('../services/board');

module.exports = function (req, res, next){
	var boardId = req.params.id;
	var userId = req.user._id;

	var userToBoard = {
		user: userId,
		board: boardId
	};

	boardService.isBoardAdmin(userToBoard, function(err, isAdmin){
		if (err){
			return res.send(400);
		}

		if (!isAdmin){
			res.send(403);
		} else {
			next();
		}
	});
};