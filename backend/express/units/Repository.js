var mongoose = require('mongoose');

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

Repository.prototype.updateById = function(id, body, callback) {
	var query = this.model.findOneAndUpdate({_id: id}, body);
	query.exec(callback);
};

Repository.prototype.delete = function(id, callback){
	var query = this.model.remove({_id: id});
	query.exec(callback);
};

Repository.prototype.removeAll = function(callback) {
	var query = this.model.remove();
	query.exec(callback);
};

module.exports = Repository;