module.exports = function(req, res, next){
	if (!req.user){
		if (req.accepts('html')){
			res.redirect('/signin');
		} else {
			res.end(403);
		} 
	} else {
		next();
	}
};