define(['marionette'], function(Marionette){

	var TaskItemView = Marionette.ItemView.extend({
		template: '#task-item-view',
		className: 'task-container',

		events: {
			'click': 'onClick'
		},

		onClick: function(){
			this.trigger('to-task-view', this.model.get('_id'));
		}
	});

	return TaskItemView;

});