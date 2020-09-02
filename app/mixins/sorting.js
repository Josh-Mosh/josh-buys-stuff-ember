  /**
 * a mixin the returns a sorted list
 *
 * @class SortingMixin
 * @requires model Array
 */
import Mixin from '@ember/object/mixin';
import { computed, observer, set } from '@ember/object';
import { run } from '@ember/runloop';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Mixin.create({

  sortField: null,
  sortDir: null,
  sortByMultiple: false,


  orderedColumns: computed('sortField', 'sortDir', function() {
    let sortColumns = this.get('sortColumns');
    const sortField = this.get('sortField');
    let column = sortColumns.findBy('sortField', sortField);
    set(column, 'direction', this.get('sortDir') || 'asc');

    sortColumns = sortColumns.filter(column => column.sortField !== sortField);
    sortColumns.unshift(column);
    return sortColumns;
  }),


  /**
   * Return an array for the sort criteria
   *
   * @property sortedValue
   * @return {array}
   */
  sortedValue: computed('sortField', 'sortDir', function() {
    let sortField = this.get('sortField');
    let sortDir = this.get('sortDir');
    let result = !sortField ? '' : sortDir ? sortField + ':' + sortDir : sortField;
    return [result];
  }),

  sortedValues: computed('orderedColumns.@each.{sortField,direction}', function() {
    return this.get('orderedColumns').map(column => {
      return !column.sortField ? '' : column.direction ? column.sortField + ':' + column.direction : column.sortField + ':asc';
    });
  }),

  sortedList: computed.sort('model', 'sortedValue'),
  sortedListMultiple: computed.sort('model', 'sortedValues'),

  pagedContent: pagedArray('filteredList', { infinite: "unpaged", perPage: 50 }),
  searchText: computed.reads('search'),

  /**
   * Compares the length of the paged content and filtered list
   *
   * @property isLastPage
   * @return {boolean}
   */
  isLastPage: computed('pagedContent.length', function() {
    return this.get('pagedContent.content.length') === this.get('pagedContent.all.content.length');
  }),

  /**
   * Gathers fields to sort by
   *
   * @property sortFields
   * @return {array}
   */
  sortFields: computed('sortColumns', function() {
    return this.get('sortColumns')
      .filter(column => !!column.sortField)
      .map(column => column.sortField);
  }),

  testableSortColumns: computed('sortColumns.[]', function() {
    return this.get('sortColumns').map( column => {
      let sortField = column.sortField
      set(column, 'testSelector', sortField && sortField.split('.').join('-')); // eslint-disable-line ember/no-side-effects
      return column;
    })
  }),
  /**
   * Watches for a change in the sort field and debounces the filter update
   *
   * @observer sortFields
   * @return {null}
   */
  searchTextObserver: observer('searchText', function() {
    run.debounce(this, this.updateDebouncedSearchText, 300);
  }),

  /**
   * Sets the debouncedSearchText to the updated searchText
   *
   * @method updateDebouncedSearchText
   * @return {null}
   */
  updateDebouncedSearchText() {
    this.set('debouncedSearchText', this.get("searchText"));
  },

  /**
   * Filters the sortedList by the searchText in the sortFields
   *
   * @property filteredList
   * @return {array}
   */
  filteredList: computed('sortedList', 'sortedListMultiple', 'debouncedSearchText', 'sortByMultiple', function() {
    const sortedSingle = this.get('sortedList');
    const sortedMultiple = this.get('sortedListMultiple');
    const search = this.get('searchText');
    const sortFields = this.get('sortFields');
    let sorted = this.get('sortByMultiple') ? sortedMultiple : sortedSingle;
    if (!search) {
      return sorted;
    } else {
      return sorted.filter(item => {
        const values = Object.values(item.getProperties(sortFields));
        return values.any(element => {
          return element && element.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
      });
    }
  }),

  actions: {

    loadNext: function() {
      this.get('pagedContent').loadNextPage();
    }

  }
});
