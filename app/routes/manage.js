import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    console.log('model');
    return this.get('store').findAll('set');
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});