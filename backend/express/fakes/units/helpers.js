var casual = require('casual');
var mongoose = require('mongoose');

casual.define('mongo_id', function(){
	return mongoose.Types.ObjectId();
});

casual.define('ids_collection_', function(entityName, referralName, maxNumber){
	var number = Math.floor(Math.random() * maxNumber);
	var collection = [];
	for (var i = 0; i < number; i++){
		collection.push(casual[entityName + '_id_'](referralName));
	}
	return collection;
});