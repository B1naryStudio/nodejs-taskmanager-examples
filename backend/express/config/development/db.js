module.exports = {
	dbname: 'taskmanager_express',
	uri: 'mongodb://localhost/taskmanager_express',
	mocked_db: false,
	opts: {
		server: { 
			auto_reconnect: true
		},
		user: 'root'
	}
};