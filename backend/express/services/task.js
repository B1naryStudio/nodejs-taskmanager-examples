var acl = require('acl');

var TaskService = function(){
	this.initACL();
};

TaskService.prototype.initACL = function() {
	acl.allow('invited_viewer', 'tasks', 'get');
	acl.allow('member', 'tasks', '*');
	acl.allow('admin', 'tasks', '*');
};