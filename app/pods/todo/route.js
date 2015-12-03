import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		var userId = this.get('session.data.authenticated.userId');
		return this.store.query('todo',{'userId':userId}, { reload: true });
	},
  	actions:{
		update:function(model){
			model.save();
			this.transitionTo('todo');
		},
		delete:function(model){
			var that = this;
			model.deleteRecord();
			model.save().then(function(value){
				that.refresh();
			});
			this.transitionTo('todo');
		},
		new:function(newObject){
			var that = this;
			var userId = this.get('session.data.authenticated.userId');
			newObject['userId'] = userId;
			var todo = this.store.createRecord('todo',newObject);
			todo.save().then(function(value) {
	          that.refresh();
	        }, function(reason) {
	            // on rejection
	        });
		},
		transition:function(){
			this.transitionTo('todo');
		}
	}
});