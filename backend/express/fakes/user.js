var casual = require('casual');
var context = require('./units/context');
var utils = require('./units/utils');
var userService = require('../services/user');

casual.define('user_', function() {
	var id = casual.mongo_id;
	context.user_ids.push(id);
	var password = casual.password;
	return {
		_id: id,
		email: casual.email,
		password: userService.encodePassword(password, false),
		password_plain: password
	};
});

casual.define('user_id_', function(entityName, unique) {
	return utils.findId('user', entityName, unique);
});