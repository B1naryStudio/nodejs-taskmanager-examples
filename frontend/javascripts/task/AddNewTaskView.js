define(['marionette'], function(Marionette){
	var AddNewTaskView = Marionette.ItemView.extend({
		className: 'create-task-modal', 
		template: '#new-task-template',
		ui: {
			'cancel': '#new-task-cancel',
			'name': '#new-task-name',
			'isPrivate': '#new-task-private',
			'createTask': '#create-task'
		},

		events: {
			'click @ui.createTask': 'onCreateTask',
			'click @ui.cancel': 'hide'
		},

		onCreateTask: function(){
			var name = this.ui.name.val();
			var isPrivate = this.ui.isPrivate.val();
			this.trigger('add', {
				name: name
			});
			this.hide();
		},

		show: function(coords){
			this.render();
			this.bindUIElements();
			this.delegateEvents();
			this.$el.appendTo(document.body);
			this.$el.css({
				top: coords.top,
				left: coords.left
			});
		},

		hide: function(){
			this.$el.remove();
			this.undelegateEvents();
		}
	});

	return AddNewTaskView;
});