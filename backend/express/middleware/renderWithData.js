module.exports = function(req, res, next){
	var object = {
		user: req.user
	};
 	res.render('layout', {
 		object: JSON.stringify(object)
 	});
};