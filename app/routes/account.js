import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  currentUser: service(),

  model() {
    const userId = this.get('session.data.authenticated.user_id');
    return this.get('store').findRecord('user', userId);
  }
});
