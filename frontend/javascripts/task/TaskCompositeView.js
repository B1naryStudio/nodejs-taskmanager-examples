define(['marionette', './TaskItemView', './AddNewTaskView', './Task'], 
	function(Marionette, TaskItemView, AddNewTaskView, Task){

	var TaskCompositeView = Marionette.CompositeView.extend({
		childView: TaskItemView,
		childViewContainer: '#tasks-container',
		template: '#tasks-template',

		ui:{
			'to-do': '#to-do .tasks-container',			
			'in-progress': '#in-progress .tasks-container',			
			'done': '#done .tasks-container',
			'addNewTask': '.add-new-task'
		},

		events: {
			'click @ui.addNewTask': 'addNewTask'
		},

		addNewTask: function(event){
			var self = this;
			this.status = event.target.dataset.status;
			if (!this.addNewTaskView){
				this.addNewTaskView = new AddNewTaskView();
				this.addNewTaskView.on('add', function(obj){
					obj.status = self.status;
					var task = new Task(obj);
					self.collection.create(task, {wait: true});
				});
			}
			this.addNewTaskView.show({
				top: event.clientY,
				left: event.clientX
			});
		},

		onDestroy: function(){
			if (this.addNewTaskView){
				this.addNewTaskView.destroy();
			}
		},

		attachHtml: function(collectionView, childView){
			var status = childView.model.get('status');
			this.ui[status].append(childView.el);
		}
	});

	return TaskCompositeView;

});