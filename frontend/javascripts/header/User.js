define(['backbone'], function(Backbone){
	var User = Backbone.Model.extend({
		defaults: {
			email: undefined,
			abbreviation: undefined
		},

		initialize: function(){
			this.bindListeners();
			this.setAbbreviation();
		},

		bindListeners: function(){
			this.on('change:email', function(){
				this.setAbbreviation();
			}, this);
		},

		setAbbreviation: function(){
			this.set('abbreviation', this.get('email').substr(0, 2));
		}
	});

	return User;
});