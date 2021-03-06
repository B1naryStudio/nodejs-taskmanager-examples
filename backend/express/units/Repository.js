var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var Repository = function(){

};

Repository.prototype.findWhere = function(props, callback) {
	var query = this.model.find(props);
	query.exec(callback);
};

Repository.prototype.findOne = function(props, callback) {
	var query = this.model.findOne(props);
	query.exec(callback);
};

Repository.prototype.findOneAndPopulate = function(props, callback) {
	var query = this.model.findOne(props);
	for (var i = 0; i < this.fieldsToPopulate.length; i++){
		query.populate(this.fieldsToPopulate[i]);
	}
	query.exec(callback);
};

Repository.prototype.add = function(data, callback) {
	this.model.create(data, function(err, data){
		callback(err, data);
	});
};

Repository.prototype.update = function(queryObj, obj, callback) {
	this.model.update(queryObj, obj, function(err, data){
		callback(err, data);
	});
};

Repository.prototype.findOneAndUpdate = function(queryObj, body, callback) {
	if (queryObj && queryObj._id){
		queryObj._id = ObjectId(queryObj._id);
	}
	var query = this.model.findOneAndUpdate(queryObj, body);
	query.exec(callback);
};

Repository.prototype.findAndDelete = function(queryObj, callback){
	if (queryObj._id){
		queryObj._id = ObjectId(queryObj._id);
	}
	var query = this.model.remove(queryObj);
	query.exec(callback);
};

Repository.prototype.removeAll = function(callback) {
	var query = this.model.remove();
	query.exec(callback);
};

Repository.prototype.remove = function(obj, callback) {
	var query = this.model.remove(obj);
	query.exec(callback);
};

module.exports = Repository;