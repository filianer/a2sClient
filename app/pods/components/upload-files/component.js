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
function isImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

/*
	Comprueba si una url es un video
*/
function isVideo(url) {
    return(url.match(/\.(mp4|ogg|avi)$/) != null);
}

export default Ember.Component.extend({
	classNames:['upload-files'],
	datos: A([]),
	fileName:null,
	newFile: null,
	pathDownload: null,
	uploading:false,
	newErrors:null,
	result: O.create({}),

	setup: on('init', function() {
		set(this, "datos", this.get('model'));
		set(this, "pathDownload", this.get('pathDownload'));
	}),
	
	mod: observer('datos.[]', function(){
		var that = this;
		var properties = this.get('properties');
		this.datos.forEach(function(data){
			//recorremos los datos y comprobamos si el path es una foto para mostrar la imagen
			properties.forEach(function(prop){
				if ( !isNone(prop.mayBeMedia) && prop.mayBeMedia && !isNone(get(data,prop.name)) ) {
					if ( isImage(get(data,prop.name)) ) {
						data.set('isImage',true);
					} else if ( isVideo(get(data,prop.name)) ) {
						data.set('isVideo',true);
					}
				}
			});

			//metemos link para descargar, hacemos un encode del id (que es el nombre) por si es un path (lleva /)
			data.set('download', that.pathDownload+encodeURIComponent(data.get('id')));
		});	
	}),

	actions:{
		delete: function(file){
			if (confirm('¿Seguro que deseas borrar el archivo?')) {
		      this.sendAction('actionDel', file);
		    }
		},
		upload: function(){
			this.result = O.create({});
			var that = this;
			set(this,"uploading",true);
			this.sendAction('actionUpload',this.newFile, this.fileName, this.result);
			//añadimos observador para ocultar la fila en función de si hay o error
			Ember.addObserver(that.result, 'resp', function(){
				set(that,'uploading', false);
				if ( Ember.isNone(that.result.resp.errors) ) {
					set(that,'newErrors', null);
					set(that, 'fileName', null);
				} else {
					set(that,'newErrors', that.result.resp.errors);
				}
			});
		},
		changeFile: function(object){
			set(this, 'newFile', object.files[0]);
			set(this, 'fileName', object.files[0].name);
		}
	}
});
