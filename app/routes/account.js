import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  currentUser: service(),

  model() {
    console.log(this.get('currentUser'));
    // console.log(this.get('session'));
    const token = this.get('session.data.authenticated.token');
    return this.get('currentUser').load();
  }
});
