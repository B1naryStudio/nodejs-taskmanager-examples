define(['marionette'], function(Marionette){

	var BoardItemView = Marionette.ItemView.extend({
		template: '#board-item-view',

		events: {
			'click': 'onClick'
		},

		onClick: function(){
			
		}
	});

	return BoardItemView;

});