define(['../units/Mediator', 'backbone', './TaskCompositeView',
	'./TaskCollection', './TaskLayout', './rightPanel/RightPanelView'], 
	function(Mediator, Backbone, TaskCompositeView,
		TaskCollection, TaskLayout, RightPanelView){

	var TaskMediator = function(){
		Mediator.prototype.constructor.call(this);
	};

	TaskMediator.prototype = new Mediator();

	TaskMediator.prototype.id = 'task';

	TaskMediator.prototype.getLayout = function(route) {
		this.boardId = route;
		if (!this.layout){
			this.initializeLayout(route);
		} 
		return this.layout;
	};

	TaskMediator.prototype.initializeLayout = function(route) {
		var self = this;

		this.layout = new TaskLayout();
		this.layout.on('show', function(){
			self.regionManager = new Marionette.RegionManager();
			self.regions = self.regionManager.addRegions({
				taskContent: '#task-content',
				rightPanel: '#task-right-panel'
			});
			var matched = self.matchRoute(route);
		});
		this.layout.on('destroy', function(){
			delete self.layout;
		});
	};

	TaskMediator.prototype.getTasksView = function() {
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

	TaskMediator.prototype.showTasks = function() {
		var tasksView = this.getTasksView();
		this.regions.taskContent.show(tasksView);
		this.regions.rightPanel.show(new RightPanelView({
			boardId: this.boardId
		}));
	};

	TaskMediator.prototype.initializeRoutes = function() {
		this.routes = {
			'': 'showTasks'
		};
	};

	return new TaskMediator();

});