require.config({
	baseUrl: '/javascripts',

	paths: {
		jquery: '/bower_components/jquery/dist/jquery.min',
		underscore: '/bower_components/underscore/underscore',
		socketio: '/bower_components/socket.io-client/socket.io',
		backbone: '/bower_components/backbone/backbone',
		marionette: '/bower_components/marionette/lib/backbone.marionette',
		foundation: '/bower_components/foundation/js/foundation',
		// validation: '/bower_components/backbone.validation/dist/backbone-validation-amd',
		// maskInput: '/bower_components/jquery.maskedinput/jquery.maskedinput',
		// datepicker: '/bower_components/foundation-datepicker/js/foundation-datepicker'
	},

	shim: {
		foundation: {
			exports: 'foundation',
			deps: ['jquery']
		},
		equalizer: {
			exports: 'equalizer',
			deps: ['foundation']
		},
		datepicker: {
			exports: 'datepicker',
			deps: ['jquery']
		}
	}
});

require(['jquery', 'foundation', 'app/app', 'validation', 'datepicker'], function($){
	$(document).foundation();
});