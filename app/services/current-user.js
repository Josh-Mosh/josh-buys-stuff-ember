import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class CurrentUserService extends Service {
  @service session;
  @service store;

  async load() {
    let userId = this.session.data.authenticated.user_id;
    if (userId) {
      let user = await this.store.findRecord('user', userId);
      this.set('user', user);
    }
  }
}