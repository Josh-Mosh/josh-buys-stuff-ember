import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import SortingMixin from '../../mixins/sorting';

export default Controller.extend(SortingMixin, {
  session: service(),

  init() {
    this._super(...arguments);
    this.set('sortColumns', [
      {
        title: 'Name',
        sortField: 'name',
      },
      {
        title: 'Set Id',
        sortField: 'setId',
      },
      {
        title: 'Favorites',
        sortField: 'favorite'
      },
      {
        title: 'Price',
        sortField: 'numericalPrice'
      },
      {
        title: 'Recently Reviewed',
        sortField: 'videoUploaded'
      }
    ]);
  },

  sortField: 'numericalPrice',
  sortDir: 'desc',

  filteredSets: computed('pagedContent.@each.hidden', 'pagedContent', function() {
    return this.get('pagedContent').filterBy('hidden', false);
  }),

  selectedSortBy: computed('sortColumns.@each.sortField', 'sortField', function() {
    return this.get('sortColumns').findBy('sortField', this.get('sortField'));
  }),

  actions: {
    transitionToSet(set) {
      this.transitionToRoute('home.set', set.get('setId'));
    },

    setSortField(sortColumn) {
      this.set('sortField', sortColumn.sortField);
    }
  }
});
