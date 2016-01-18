import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('string'),
  path: DS.attr('string'),
  totalFiles: DS.attr('string'),
  size: DS.attr('string'),
  // service: DS.attr('string')
});
