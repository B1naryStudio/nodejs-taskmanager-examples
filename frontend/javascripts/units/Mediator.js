define(['backbone', 'underscore'], function(Backbone, _){
	var Mediator = function(){
		_.extend(this, Backbone.Events);

		if (this.id){
			this.initializeRoutes();
		}

		this.bindParentListeners();

		if (this.bindListeners){
			this.bindListeners();
		}
	};

	Mediator.prototype.bindParentListeners = function() {
		var self = this;
		this.listenTo(Backbone, 'current-mediator', function(options){
			var mediatorId = options.name;
			if (mediatorId !== self.id && self.isCurrentMediator){
				if (self.layout){
					self.layout.destroy();
					delete self.layout;
				}
				self.isCurrentMediator = false;
			} else if (!self.isCurrentMediator){
				self.isCurrentMediator = true;
			}
		});
	};

	Mediator.prototype.matchRoute = function(route) {
		var matched = true;
		if (route){
			route = route.toLowerCase();
		}
		var method = this.routes[route];
		if (!method){
			method = this.routes[''];
			matched = false;
		}
		this[method].call(this);
		return matched;
	};

	return Mediator;

});