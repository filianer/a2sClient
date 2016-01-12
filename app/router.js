import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('todo', function() {
    this.route('detail', {path:'/:id'});
  });

  this.route('container', {path: '/storage'});
  this.route('file', {path: '/storage/file'});
});

export default Router;
