import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		var userId = this.get('session.data.authenticated.userId');
		// return this.store.query('todo',{'userId':userId}, { reload: true });
		return this.store.filter('todo',{'userId':userId}, function(todo){
			return todo;
		});
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
		new:function(model){
			var userId = this.get('session.data.authenticated.userId');
			var newObject = {
				text: model.text,
				userId: userId
			}
			
			var todo = this.store.createRecord('todo',newObject);		
			todo.save().then(function(value) {
	        	console.log("todo guardado con exito")
	        }, function(reason) {
	            console.log("error al guardar: "+reason);
	        });
		},
		transition:function(){
			this.transitionTo('todo');
		}
	}
});