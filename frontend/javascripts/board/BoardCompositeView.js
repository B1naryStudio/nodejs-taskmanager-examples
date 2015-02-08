define(['marionette', './BoardItemView', './AddNewBoardView'], 
	function(Marionette, BoardItemView, AddNewBoardView){

	var BoardCompositeView = Marionette.CompositeView.extend({
		childView: BoardItemView,
		childViewContainer: '#boards-container',
		template: '#boards-template',

		ui:{
			'create': '#add-board'
		},

		events: {
			'click @ui.create': 'onCreate'
		},

		onCreate: function(event){
			var self = this;
			if (!this.addNewBoardView){
				this.addNewBoardView = new AddNewBoardView();
				this.addNewBoardView.on('add', function(obj){
					self.model.set(obj);
					self.collection.create(self.model.attributes);
				});
			}
			this.addNewBoardView.show({
				top: event.clientY,
				left: event.clientX
			});
		},

		onDestroy: function(){
			if (this.addNewBoardView){
				this.addNewBoardView.destroy();
			}
		}
	});

	return BoardCompositeView;

});