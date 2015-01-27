var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Task = new mongoose.Schema({
	name : String,
	decription : String,
	assignee :  ObjectId
});

module.exports = mongoose.model('Task', Task);
