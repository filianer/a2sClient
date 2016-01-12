import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Config from 'a2s-client/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function() {
		var userId = this.get('session.data.authenticated.userId');
		this.store.adapterFor('file').set('namespace',"storage/container/"+userId);
		this.controllerFor('file').set('pathDownload', Config.host+"/storage/container/"+userId+"/download/");
		return this.store.findAll('file');
	},

	actions:{
		upload: function(file, path){
			var that = this;
			var userId = this.get('session.data.authenticated.userId');
			var url = Config.host + "/storage/container/"+userId+"/upload";
			ajaxRequestUploadFile(url, userId, file, path).then(function(resp){
				that.refresh();
			}, function(err){
				console.log("error upload file");
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
