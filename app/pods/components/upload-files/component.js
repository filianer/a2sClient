import Ember from 'ember';

const {
	on,
	A,
	computed,
	getProperties,
	observer,
	get,
	set,
	getWithDefault,
	isNone,
	isPresent,
	compare,
	setProperties,
	isEmpty,
} = Ember;

const O = Ember.Object;
const keys = Object.keys;

/*
	Comprueba si una url es una imagen
*/
function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export default Ember.Component.extend({
	classNames:['upload-files'],
	datos: A([]),
	fileName:null,
	newFile: null,

	setup: on('init', function() {
		set(this, "datos", this.get('model'));
	}),
	
	mod: observer('datos.[]', function(){
		var properties = this.get('properties');
		this.datos.forEach(function(data){
			//recorremos los datos y comprobamos si el path es una foto para mostrar la imagen
			properties.forEach(function(prop){
				if ( !isNone(prop.mayBeImage) && prop.mayBeImage && 
					!isNone(get(data,prop.name)) && checkURL(get(data,prop.name))) {
					data.set('isImage',true);
				}
			});
		});	
	}),

	actions:{
		delete: function(file){
			if (confirm('¿Seguro que deseas borrar el archivo?')) {
		      this.sendAction('actionDel', file);
		    }
		},
		upload: function(){
			this.sendAction('actionUpload',this.newFile);
		},
		changeFile: function(object){
			set(this, 'newFile', object.files[0]);
			set(this, 'fileName', object.files[0].name);
		}
	}
});
