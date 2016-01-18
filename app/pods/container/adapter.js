import DS from 'ember-data';
import Config from 'a2s-client/config/environment';

export default DS.RESTAdapter.extend({
	host: Config.host,
  	namespace: Config.namespaceStorage,
  	service:"local",

  	buildURL (modelName, id, snapshot, requestType, query){
	    return this._super(modelName, id, snapshot, requestType, query)+"?service="+this.service;
	},
});