var casual = require('casual');
var context = require('./units/context');
var utils = require('./units/utils');

casual.define('user_ids_collection_', function(maxNumber){
	var users = casual.ids_collection_('user', 'board', maxNumber);
	users = users.map(function(el){
		return {
			userId: el,
			isAdmin: casual.random_element([true, false, false, false, false])
		};
	});
	return users;
});

casual.define('board_id_', function(entityName, unique) {
	return utils.findId('board', entityName, unique);
});

casual.define('board_', function() {
	var id = casual.board_id_('board');
	return {
		_id: id,
		name: casual.word,
		isPrivate: casual.random_element([true, false]),
		users: casual.user_ids_collection_(10)
	};
});


(function generateBoardIds(maxNumber){

	var collection = [];
	for (var i = 0; i < maxNumber; i++){
		collection.push(casual.mongo_id);
	}
	context.board_ids = collection;

})(100);
