define(['underscore', 'backbone','units/SocketHandler', 'marionette', 
		'./appMediator', 'jquery', './router', './context'], 
	function(_, Backbone, socketHandler, Marionette, 
		appMediator, $, context){

	_.templateSettings = {
		'evaluate': /\{\{(.+?)\}\}/g,
		'interpolate': /\{\{=(.+?)\}\}/g,
		'escape': /\{\{\-(.+?)\}\}/g
	};

	// _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
	
	var app = new Marionette.Application();

	app.on('start', function(){
		if (Backbone.history){ Backbone.history.start({ pushState: true }); }

	});

	$(document).on('click', 'a:not([data-bypass])', function(evt) {
		var href = { 
			prop: $(this).prop('href'), 
			attr: $(this).attr('href') 
		};
		var root = location.protocol + '//' + location.host;

		if (href.prop && href.prop.search(root) === 0) {
			evt.preventDefault();
			Backbone.history.navigate(href.attr, true);
		}
	});

	window.Modernizr = {};

	app.start();

	context.app = app;

	return app;

});