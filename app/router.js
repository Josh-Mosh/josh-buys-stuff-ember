import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('home', { path: '' }, function() {
    this.route('set', { path: '/:set_id' });
  });

  this.route('login');

  this.route('authenticated', { path: 'admin' }, function() {
    this.route('sets', { resetNamespace: true });
    this.route('themes', { resetNamespace: true });
    this.route('account', { resetNamespace: true });
  });

  this.route('about');
  this.route('disclosure');
});
