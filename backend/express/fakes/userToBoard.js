var casual = require('casual');
var context = require('./units/context');
var utils = require('./units/utils');

casual.define('userToBoard_', function() {
	var id = casual.mongo_id;
	var password = casual.password;
	return {
		_id: id,
		user: casual.user_id_('userToBoard', false),
		board: casual.board_id_('userToBoard', false),
		isAdmin: casual.random_element([true, false, false, false, false])
	};
});