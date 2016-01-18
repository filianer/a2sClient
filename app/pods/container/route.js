import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function() {
		this.store.unloadAll('container'); //vaciamos los files que había
		return this.store.findAll('container');
	},

	actions:{
		new: function(container){
			console.log("container: "+JSON.stringify(container));
			var model = this.store.createRecord('container',{
				_id:container.id,
			});
			model.save().then(function(value) {
	          Ember.debug("dtos guardados correctamente");
	          container.set("model",model); //establecemos el modelo en el objeto para controlar errores en el observer del componente
	        }, function(reason) {
	        	console.log("Error creando ruta: "+JSON.stringify(reason));
	            container.set("model",model); //establecemos el modelo en el objeto para controlar errores en el observer del componente
	        });
		},

		delete: function(model){
			model.deleteRecord();
			model.save().catch(function() {
			  console.log("error borrando datos");
			  model.rollbackAttributes();
			});
		}, 

		refreshRoute: function(){
			this.refresh();
		}
	}
});