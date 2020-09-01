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
        title: "Josh's Favorites",
        sortField: 'favorite',
        direction: 'desc'
      },
      {
        title: 'Recently Reviewed',
        sortField: 'videoUploaded',
        direction: 'desc'
      },
      {
        title: 'Name',
        sortField: 'name',
      },
      {
        title: 'Set Id',
        sortField: 'setId',
      },
      {
        title: 'Price - High',
        sortField: 'numericalPrice',
        direction: 'desc'
      },
      {
        title: 'Price - Low',
        sortField: 'numericalPrice'
      },
      {
        title: 'Piece Count',
        sortField: 'pieces',
        direction: 'desc'
      },
      {
        title: 'Theme',
        sortField: 'theme.name',
        noSort: true
      },
      {
        title: 'Ages',
        sortField: 'age',
        noSort: true
      }
    ]);
  },

  sortField: 'favorite',
  sortDir: 'desc',

  filteredSets: computed('pagedContent.@each.hidden', 'pagedContent', function() {
    return this.get('pagedContent').filter((set) => {
      return set.get('hidden') === false;
    });
  }),

  favoriteSets: computed.filterBy('pagedContent', 'favorite'),

  availableSortFields: computed('sortColumns.@each.noSort', function() {
    return this.get('sortColumns').rejectBy('noSort');
  }),

  selectedSortBy: computed('sortColumns.@each.sortField', 'sortField', function() {
    return this.get('sortColumns').findBy('sortField', this.get('sortField'));
  }),

  actions: {
    transitionToSet(set) {
      this.transitionToRoute('set', set.get('setId'));
    },

    setSortField(sortColumn) {
      this.set('sortDir', sortColumn.direction || 'asc');
      this.set('sortField', sortColumn.sortField);
    }
  }
});
