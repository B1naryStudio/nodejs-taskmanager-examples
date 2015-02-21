define(['marionette', './TaskItemView', './AddNewTaskView', './Task', 'app/context'], 
	function(Marionette, TaskItemView, AddNewTaskView, Task, context){

	var TaskCompositeView = Marionette.CompositeView.extend({
		childView: TaskItemView,
		template: '#tasks-template',

		ui:{
			'to-do': '#tasks-to-do .tasks-container',			
			'in-progress': '#tasks-in-progress .tasks-container',			
			'done': '#tasks-done .tasks-container',
			'addNewTask': '.add-new-task'
		},

		events: {
			'click @ui.addNewTask': 'addNewTask'
		},

		childEvents: {
			'to-task-view': 'onTaskClick'
		},

		addNewTask: function(event){
			var self = this;
			this.status = event.target.dataset.status;
			if (!this.addNewTaskView){
				this.addNewTaskView = new AddNewTaskView();
				this.addNewTaskView.on('add', function(obj){
					obj.status = self.status;
					obj.boardId = self.collection.boardId;
					var task = new Task(obj);
					self.collection.create(task, {wait: true});
				});
			}
			this.addNewTaskView.show({
				top: event.clientY,
				left: event.clientX
			});
		},

		onTaskClick: function(el, id){
			context.router.navigate('board/' + this.collection.boardId + '/task/'+ id,{
				trigger: true
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