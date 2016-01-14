import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Config from 'a2s-client/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function(params) {
		this.store.unloadAll('file'); //vaciamos los files que había
		this.store.adapterFor('file').set('namespace',"storage/containers/"+params.container);
		this.controllerFor('file').set('pathDownload', Config.host+"/storage/containers/"+params.container+"/download/");
		this.controllerFor('file').set('container', params.container);
		return this.store.findAll('file');
	},

	actions:{
		upload: function(file, path, result){
			var that = this;
			var container = this.controllerFor('file').get('container');
			var url = Config.host + "/storage/containers/"+container+"/upload";
			ajaxRequestUploadFile(url, Config.uploadTag, file, path).then(function(resp){
				if ( !Ember.isNone(resp.file) && !Ember.isNone(resp.file._id) && !Ember.isNone(resp.file.path) ) {
					result.set("resp",resp);
					//Agregamos al store local, en el server ya se ha guardado
					that.store.pushPayload(resp);
				} else {
					console.log("Error, respuesta incorrecta");
				}
			}, function(err){
				console.log("error upload file: "+err);
				result.set("resp",{"errors":err});
			});
		},

		uploadUrl: function(fileUrl, path, result){
			var that = this;
			var container = this.controllerFor('file').get('container');
			var url = Config.host + "/storage/containers/"+container+"/upload";
			ajaxRequestUploadUrl(url, fileUrl, path).then(function(resp){
				if ( !Ember.isNone(resp.file) && !Ember.isNone(resp.file._id) && !Ember.isNone(resp.file.path) ) {
					result.set("resp",resp);
					//Agregamos al store local, en el server ya se ha guardado
					that.store.pushPayload(resp);
				} else {
					console.log("Error, respuesta incorrecta");
				}
			}, function(err){
				console.log("error upload url: "+err);
				result.set("resp",{"errors":err});
			});
		},

		delete: function(model){
			model.deleteRecord();
			model.save().catch(function() {
				console.log("error borrando fichero");
				model.rollbackAttributes(); //TODO probar
			});
		}
	}
});
