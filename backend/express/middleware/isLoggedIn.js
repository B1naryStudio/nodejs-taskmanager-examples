module.exports = function(req, res, next){
	if (!req.user){
		if (req.accepts('html') && req.originalUrl.indexOf('/api') !== 0){
			res.redirect('/auth/signin');
		} else {
			res.status(403).end();
		} 
	} else {
		next();
	}
};