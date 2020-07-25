import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
})
