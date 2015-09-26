var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Task = require('./Task');

var Board = new mongoose.Schema({
	name: String,
	isPrivate: Boolean
});

module.exports = mongoose.model('Board', Board);