import DS from 'ember-data';
import Config from 'a2s-client/config/environment';

export default DS.RESTAdapter.extend({
  namespace: Config.namespace,
  host: Config.host,
});
