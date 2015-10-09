define(['marionette'], function(Marionette){

	var UserMenuView = Marionette.ItemView.extend({
		template: '#user-menu-template',
		className: 'user-menu-modal',

		ui: {
			remove: '#um-remove-user',
			admin: '#um-admin'
		},

		events: {
			'click @ui.remove': 'onRemoveUser',
			'click @ui.admin': 'onChangeAdminRghts',
			'click': 'onClick'
		},

		onClick: function(ev){
			ev.stopPropagation();
		},

		onRemoveUser: function(){
			this.trigger('remove-user', this.model.get('_id'));
		},

		onChangeAdminRghts: function(){
			this.trigger('change-admin-rights', {
				id: this.model.get('_id'),
				isAdmin: !this.model.get('isAdmin')
			});
		},

		show: function(coords){
			this.render();
			this.$el.appendTo(document.body);
			this.$el.css({
				top: coords.top,
				left: coords.left - 150
			});
			this.bindClick();
		},

		bindClick: function(){
			var initialized;
			$(document).on('click.modal' + this.cid, function(){
				if (initialized){
					this.destroy();
					$(document).off('click.modal' + this.cid);
					initialized = false;
				} else {
					initialized = true;
				}
			}.bind(this));
		}
	});

	return UserMenuView;

});