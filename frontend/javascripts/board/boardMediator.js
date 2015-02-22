define(['../units/Mediator', 'backbone', './TaskCompositeView',
	'./TaskCollection', './BoardLayout', './rightPanel/RightPanelView',
	'../task/Task', '../task/TaskView', 'app/context'], 
	function(Mediator, Backbone, TaskCompositeView,
		TaskCollection, BoardLayout, RightPanelView,
		Task, TaskView, context){

	var BoardMediator = function(){
		Mediator.prototype.constructor.call(this);
	};

	BoardMediator.prototype = new Mediator();

	BoardMediator.prototype.id = 'board';

	BoardMediator.prototype.getLayout = function(route) {
		this.boardId = route;
		if (!this.layout){
			this.initializeLayout(route);
		} 
		return this.layout;
	};

	BoardMediator.prototype.initializeLayout = function(route) {
		var self = this;

		this.layout = new BoardLayout();
		this.layout.on('show', function(){
			self.regionManager = new Marionette.RegionManager();
			self.regions = self.regionManager.addRegions({
				taskContent: '#task-content',
				rightPanel: '#task-right-panel'
			});
			var matched = self.matchRoute(route);
		});
		this.listenTo(this.layout, 'destroy', this.onDestroy, this);
	};

	BoardMediator.prototype.onDestroy = function() {
		delete this.layout;
		if (this.taskView){
			this.taskView.destroy();
		}
	};

	BoardMediator.prototype.getTasksView = function() {
			var self = this;
			if (!this.task){
				this.task = {};
				this.task.collection = new TaskCollection();
			}
			this.task.collection.boardId = this.boardId;
			this.task.collection.fetch();
			this.task.view = new TaskCompositeView({
				collection: this.task.collection,
				model: new Backbone.Model()
			});

			return this.task.view;
	};

	BoardMediator.prototype.showTasks = function() {
		var tasksView = this.getTasksView();
		this.regions.taskContent.show(tasksView);

		var rightPanelView = new RightPanelView({
			boardId: this.boardId
		});

		this.listenTo(rightPanelView, 'archived', function(archived){
			this.task.collection.setArchived(archived);
		}, this);

		this.regions.rightPanel.show(rightPanelView);

	};

	BoardMediator.prototype.showTask = function(task_id) {
		this.fullTask = new Task({
			_id: task_id
		});
		this.taskView = new TaskView({
			model: this.fullTask
		});
		this.taskView.show();
		this.listenTo(this.taskView, 'destroy', function(){
			context.router.navigate('board/' + this.boardId, {trigger: true});
		}, this);
		this.fullTask.fetch();
	};

	BoardMediator.prototype.initializeRoutes = function() {
		this.routes = {
			'': 'showTasks'
		};
	};

	return new BoardMediator();

});