var acl = require('acl');

var mongoBackend = new acl.mongodbBackend(dbConnectionHandler.connection, 'acl_');
var aclInstance = new acl(mongoBackend);

module.exports = aclInstance;
