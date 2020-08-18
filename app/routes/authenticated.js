import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  setupController(controller, /*model*/) {
    controller.set('session', this.get('session'));
  },

  redirect(model, transition) {
    if (transition.intent.url === '/admin' || transition.intent.url === '/admin/') {
      this.transitionTo('sets');
    }
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
