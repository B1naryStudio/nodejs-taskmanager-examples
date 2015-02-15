var casual = require('casual');
var async = require('async');
var mongoose = require('mongoose');
var dbConnectionHandler = require('../units/dbConnectionHandler');

var repositories = {
	board: require('../repositories/board'),
	task: require('../repositories/task'),
	user: require('../repositories/user')
};

require('./units/helpers');

require('./board');
require('./task');
require('./user');


var generate = function(type, count, toBeCleaned, callback) { 
	if (typeof callback === 'undefined'){
		callback = toBeCleaned;
	}
	if (toBeCleaned || typeof toBeCleaned === 'undefined'){
		repositories[type].removeAll();
	}

	var entities = [];
	for (var i = 0; i < count; i++){
		entities.push(casual[type + '_']);
	}
	console.log(entities);
	repositories[type].add(entities, callback);
};

async.waterfall([
	generate.bind(null, 'user', 10),
	generate.bind(null, 'task', 2000),
	generate.bind(null, 'board', 100)
], function(err, data){
	console.log('async', err);
	process.exit();
});