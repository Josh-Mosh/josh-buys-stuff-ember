import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    const sets = this.get('store').findAll('set');
    const themes = this.get('store').findAll('theme');
    return RSVP.hash({ sets, themes });
  },

  setupController(controller, models) {
    this._super(controller, models.sets);
    controller.set('themes', models.themes);
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});