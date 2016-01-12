import DS from 'ember-data';
import Config from 'a2s-client/config/environment';

export default DS.RESTAdapter.extend({
	host: Config.host,
  	namespace: Config.namespaceStorage,
});