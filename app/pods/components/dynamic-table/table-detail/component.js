import Ember from 'ember';

export default Ember.Component.extend({

	actions: {
		update:function(object){
			this.sendAction('actionUp', object);
			$('#modalDetail').modal('hide');
		},
		delete:function(modelo){
			if ( this.get('showConfirmation') ) {
				this.sendAction('showConfirmation', null, this.get('messages.confirmDelete'), this.get("actionDel"), modelo, "danger");
				$('#modalDetail').modal('hide');
			} else {
				if (confirm(get(this, 'messages.confirmDelete'))) {
			      this.sendAction('actionDel', modelo);
			    }
			    $('#modalDetail').modal('hide');
			}
		}, 
		reset:function(){
			this.get('model').rollbackAttributes();

			//para que vuelva a la ruta del padre
			if ( this.get('transition') ) {
				this.sendAction(this.get('transition'));
			}
		}
	}
});