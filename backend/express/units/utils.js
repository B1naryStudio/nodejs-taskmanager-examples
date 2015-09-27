module.exports = {
	escapeRegExp: function(string){
		var str = string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
		return str;
	}
};