import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('layout', { path: '' }, function() {
    this.route('home', { resetNamespace: true, path: '' }, function() {
      this.route('set', { resetNamespace: true, path: '/sets/:set_id' });
    });

    this.route('login');

    this.route('authenticated', { path: 'admin' }, function() {
      this.route('sets', { resetNamespace: true });
      this.route('themes', { resetNamespace: true });
      this.route('account', { resetNamespace: true });
    });

    this.route('about', { resetNamespace: true });
    this.route('disclosure', { resetNamespace: true });
  });

  this.route('click', { path: ':set_id' });
});
