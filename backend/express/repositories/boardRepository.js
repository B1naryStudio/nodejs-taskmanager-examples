var Repository = require('../units/Repository');
var Board = require('../schemas/Board');


function BoardRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Board;
}

module.exports = new BoardRepository();