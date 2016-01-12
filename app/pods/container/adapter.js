import DS from 'ember-data';
import Config from 'a2s-client/config/environment';
export default DS.RESTAdapter.extend({
  host: Config.host,
  pathForType (modelName) {
    return null;
  },
  urlForCreateRecord (modelName, snapshot) {
  	this.host = Config.host + "/storage/container";
  	modelName = "storage/container";
  	return this._super(modelName, snapshot);
  }
});