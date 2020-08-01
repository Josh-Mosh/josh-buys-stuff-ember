import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    transitionToSet(set) {
      this.transitionToRoute('home.set', set.get('setId'));
    }
  }
});
