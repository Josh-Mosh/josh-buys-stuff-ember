import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('home', { path: '' }, function() {
    this.route('set', { path: '/:setId' });
  });

  this.route('login');

  this.route('authenticated', { path: 'admin' }, function() {
    this.route('sets', { resetNamespace: true });
    this.route('themes', { resetNamespace: true });
  });

  this.route('disclosure');
});
