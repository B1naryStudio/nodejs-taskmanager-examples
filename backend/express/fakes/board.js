var casual = require('casual');
var context = require('./units/context');
var utils = require('./units/utils');

casual.define('board_id_', function(entityName, unique) {
	return utils.findId('board', entityName, unique);
});

casual.define('board_', function() {
	var id = casual.board_id_('board');
	return {
		_id: id,
		name: casual.word,
		isPrivate: casual.random_element([true, false])
	};
});


(function generateBoardIds(maxNumber){

	var collection = [];
	for (var i = 0; i < maxNumber; i++){
		collection.push(casual.mongo_id);
	}
	context.board_ids = collection;

})(100);
