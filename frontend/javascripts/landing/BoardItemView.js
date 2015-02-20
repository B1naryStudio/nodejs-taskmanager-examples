define(['marionette', '../app/context'], function(Marionette, context){

	var BoardItemView = Marionette.ItemView.extend({
		template: '#board-item-view',
		className: 'board-container',

		events: {
			'click': 'onClick'
		},

		onClick: function(){
			context.router.navigate('board/'+ this.model.id, {trigger: true});
		}
	});

	return BoardItemView;

});