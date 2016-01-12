import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {


	model: function() {
		var userId = this.get('session.data.authenticated.userId');
		this.store.adapterFor('container').set('namespace',"storage/container/"+userId);

		var result = this.store.findAll('container').then(function(value){
			return value;
		}, function(error){
			console.log("Error: "+error);
			return null
		});
	
		return result;
	},
	afterModel: function(containers, transition){
		//si no hay containers nos creamos uno por defecto con el id de usuario
		if ( Ember.isNone(containers) || !containers.get('length') ) {
			console.log("Creamos container")
			var userId = this.get('session.data.authenticated.userId');
			var model = this.store.createRecord('container',{
				name:userId
			});
			model.save().then(function(value){
				console.log("datos guardados con éxito");
				transition.retry();
			}, function(reason){
				console.log("Error creando container");
			});
		} else {
			this.transitionTo('file');
		}
	}
});