var context = require('./context');
var casual = require('casual');

module.exports = {
	findId: function(collectionName, entityName, unique){
		var arrayName = collectionName + '_' + entityName;
		if (!context[arrayName]){
			context[arrayName] = [].slice.call(context[collectionName + '_ids']);
		}
		var length = context[arrayName].length;
		var index = Math.floor(Math.random() * length);

		var res;
		if (unique || typeof unique === 'undefined'){
			var spliced = context[arrayName].splice(index, 1);
			res = spliced[0];
		} else {
			res = context[arrayName][index];
		}
		return res;
	}
};