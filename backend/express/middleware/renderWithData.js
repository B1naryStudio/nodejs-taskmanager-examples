module.exports = function(req, res, next){
 	res.render('layout', {
 		user: JSON.stringify(req.user)
 	});
 	console.log(req.user);
};