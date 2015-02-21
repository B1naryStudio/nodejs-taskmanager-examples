define(['marionette'], function(Marionette){
	var TaskView = Marionette.ItemView.extend({
		template: '#task-modal-template',
		id: 'task-modal',

		ui: {
			'name': '#t-name',
			'close': '#t-close',
			'description': '#t-description',
			'addMembers': '#t-add-members',
			'archive': '#t-archive',
			'remove': '#t-remove'
		},

		events: {
			'change @ui.name': 'onNameChange',
			'change @ui.description': 'onDescriptionChange',
			'click @ui.addMembers': 'addMembers',
			'click @ui.archive': 'archive',
			'click @ui.remove': 'remove'
		},

		show: function(){
			this.render();
			this.$el.appendTo($('body'));
		},

		hide: function(){
			this.destroy();
		},

		onNameChange: function(){
			var name = this.ui.name.val();
			if (name){
				this.model.set('name', name);
				this.model.save();
			}
		},

		onDescriptionChange: function(){
			var description = this.ui.description.val();
			if (description){
				this.model.set('description', description);
				this.model.save();
			}
		},

		addMembers: function(){

		},

		archive: function(){
			this.model.set('archive', true);
			this.model.save();
		},

		remove: function(){
			this.model.destroy();
		}
	});

	return TaskView;
});