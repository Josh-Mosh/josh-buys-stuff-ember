import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service(),

  filteredSets: computed('sets.@each.hidden', function() {
    return this.get('sets').filterBy('hidden', false);
  }),

  actions: {
    transitionToSet(set) {
      this.transitionToRoute('home.set', set.get('setId'));
    }
  }
});
