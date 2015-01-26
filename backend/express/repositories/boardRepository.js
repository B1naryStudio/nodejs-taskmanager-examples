var Repository = require('../units/Repository');
var Board = require('../schemas/board');


function BoardRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Board;
}

module.exports = new BoardRepository();