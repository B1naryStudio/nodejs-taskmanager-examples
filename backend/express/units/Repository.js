var mongoose = require('mongoose');

var Repository = function(){

};

Repository.prototype.findOne = function(props, callback) {
	var query = this.model.findOne(props);
	query.exec(callback);
};

Repository.prototype.add = function(data, callback) {
	var newitem = new this.model(data);
	newitem.save(callback);
};

Repository.prototype.updateById = function(id, body, callback) {
	var query = this.model.findOneAndUpdate({_id: id}, body);
	query.exec(callback);
};

Repository.prototype.delete = function(id, callback){
	var query = this.model.remove({_id: id});
	query.exec(callback);
};

module.exports = Repository;