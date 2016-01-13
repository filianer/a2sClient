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

function testImage(url, callback, timeout) {
    timeout = timeout || 7000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(false);
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(true);
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        callback(false);
    }, timeout); 
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
	fileNameUrl:null,
	fileUrl: null,
	newFile: null,
	pathDownload: null,
	uploading:false,
	newErrors:null,
	result: O.create({}),
	fileUrlValid: null,
	preview: "/assets/images/file.png",

	setup: on('init', function() {
		set(this, "datos", this.get('model'));
		set(this, "pathDownload", this.get('pathDownload'));
	}),

	modUrl: observer('fileUrl', function(){
		var that = this;
		if ( !isEmpty(this.fileUrl) ) {
			testImage(this.fileUrl, function(status){
				if ( status ) {
					set(that, "fileUrlValid", that.fileUrl);
				} else {
					set(that, "fileUrlValid", "/assets/images/file.png");
				}
			})
		} else {
			set(this, "fileUrlValid", null);
		}
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
					console.log("Errors: "+JSON.stringify(that.result.resp.errors));
					set(that,'newErrors', JSON.stringify(that.result.resp.errors));
				}
			});
		},
		uploadUrl: function(){
			var that = this;
			this.result = O.create({});
			this.sendAction('actionUploadUrl',this.fileUrl, this.fileNameUrl, this.result);
			//añadimos observador para ocultar la fila en función de si hay o error
			Ember.addObserver(that.result, 'resp', function(){
				set(that,'uploading', false);
				if ( Ember.isNone(that.result.resp.errors) ) {
					set(that,'newErrors', null);
					set(that, 'fileNameUrl', null);
					set(that, 'fileUrl', null);
				} else {
					console.log("Errors: "+JSON.stringify(that.result.resp.errors));
					set(that,'newErrors', JSON.stringify(that.result.resp.errors));
				}
			});
		},
		changeFile: function(object){
			var that = this;
			var file = object.files[0];
			set(this, 'newFile', file);
			set(this, 'fileName', file.name);

			//mostramos icono, si es foto la foto
			var reader = new FileReader();
		    var image  = new Image();
		    reader.readAsDataURL(file);  
		    reader.onload = function(_file) {
		        image.src    = _file.target.result;
		        image.onload = function() {
		        	set(that,"preview", this.src);
		        };
		        image.onerror= function() {
		           //mostramos icono por defecto
		           set(that,"preview", "/assets/images/file.png");
		        };      
		    };
		}
	}
});
