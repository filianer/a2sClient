import Ember from 'ember';

export default Ember.Component.extend({
	tagName:'',

	actions: {
		update:function(model){
			this.sendAction('actionUp', model);
			//añadimos observador para ocultar la fila en función de si hay o error
			Ember.addObserver(model, 'error', function(){
				if ( !model.get('error') ) {
					Ember.set(model,'visibilityEdit', false);
					Ember.set(model,'visibility', 'show_row');
				}
			});
		},
		reset:function(model){
			//volvemos a dejar los datos como estaban por si hemos cambiado algo pero no le dimos a save o por si falló el update
			model.rollbackAttributes();
			//para que vuelva a la ruta del padre
			if ( this.get('transition') ) {
				this.sendAction(this.get('transition'));
			}
			//ocultamos fila de edición
			Ember.set(model,'visibilityEdit', false);
			//mostramos fila normal
			Ember.set(model,'visibility', 'show_row');
		}
	}
});