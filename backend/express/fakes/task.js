var casual = require('casual');
var context = require('./units/context');
var utils = require('./units/utils');

casual.define('task_status_', function(){
	var statuses = ['to-do', 'in-progress', 'done'];
	return statuses[Math.floor(Math.random() * 3)];
});

casual.define('task_', function() 
{
	var id = casual.mongo_id;
	context.task_ids.push(id);
	return {
		_id: id,
		name: casual.sentence,
		description: casual.sentence,
		assignee: casual.user_id_('task', false),
		status: casual.task_status_,
		boardId: casual.board_id_('task', false),
		isArchived: casual.random_element(true, false)
	};
});

casual.define('task_id_', function(entityName) {
	return utils.findId('task', entityName);
});
