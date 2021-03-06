import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  routeAfterAuthentication: 'admin/sets',

  setupController(controller) {
    controller.set('session', this.get('session'));
  }
});
