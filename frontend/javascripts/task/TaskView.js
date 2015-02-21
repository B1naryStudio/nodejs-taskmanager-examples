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
			'blur @ui.name': 'onNameChange',
			'blur @ui.description': 'onDescriptionChange',
			'click @ui.addMembers': 'addMembers',
			'click @ui.archive': 'archive',
			'click @ui.remove': 'onRemove'
		},

		modelEvents: {
			'sync': 'render'
		},

		initialize: function(){
			this.background = $('#background');
			this.background.on('click', this.hide.bind(this));
		},

		show: function(){
			this.render();
			this.$el.appendTo($('body'));
			this.showBackground();
		},

		hide: function(){
			this.destroy();
		},

		onNameChange: function(){
			var name = this.ui.name.text();
			if (name){
				this.model.set('name', name);
				this.model.save();
			}
		},

		onDescriptionChange: function(){
			var description = this.ui.description.text();
			this.model.set('description', description);
			this.model.save();
		},

		addMembers: function(){

		},

		archive: function(){
			this.model.set('archive', true);
			this.model.save();
		},

		onRemove: function(){
			this.model.destroy();
		},

		showBackground: function(){
			this.background.addClass('show');
		},

		onDestroy: function(){
			this.background.removeClass('show');			
		}


	});

	return TaskView;
});