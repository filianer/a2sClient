import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  path: DS.attr('string'),
  size: DS.attr('number'),
  totalFiles: DS.attr('number'),
});