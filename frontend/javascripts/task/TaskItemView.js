define(['marionette', '../app/context'], function(Marionette, context){

	var TaskItemView = Marionette.ItemView.extend({
		template: '#task-item-view',
		className: 'task-container',

		events: {
			'click': 'onClick'
		},

		onClick: function(){
			context.router.navigate('task/'+ this.model.id);
		}
	});

	return TaskItemView;

});