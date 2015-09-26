var boardService = require('../services/board');

module.exports = function (req, res, next){
	var boardId = req.params.id;
	var userId = req.user._id;

	var userToBoard = {
		user: userId,
		board: boardId
	};

	boardService.isBoardMember(userToBoard, function(err, isMember){
		if (err){
			return res.send(400);
		}

		if (!isMember){
			res.send(403);
		} else {
			next();
		}
	});
};