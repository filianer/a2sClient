import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		return this.get('store').findAll('todo');
	},
  	actions:{
		update:function(model){
			model.save();
			this.transitionTo('todo');
		},
		delete:function(model){
			model.deleteRecord();
			model.save();
			this.transitionTo('todo');
		},
		new:function(newObject){
			var todo = this.store.createRecord('todo',newObject);
			todo.save();
		},
		transition:function(){
			this.transitionTo('todo');
		}
	}
});