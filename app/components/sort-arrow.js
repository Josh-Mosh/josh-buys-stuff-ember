import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  alwaysShowActive: false,

  isAsc: computed('sortDir', function() {
    let sortDir = this.get('sortDir');
    return sortDir === 'asc' || !sortDir;
  }),

  isActive: computed('sortField', 'sortFieldName', function() {
    let sortField = this.get('sortField'),
        sortFieldName = this.get('sortFieldName');
    return sortField === sortFieldName;
  }),

  actions: {
    toggle: function() {
      let sortFieldName = this.get('sortFieldName'),
          sortField= this.get('sortField'),
          sortDir = this.get('sortDir') === 'asc' ? 'desc' : 'asc';

      //If i am clicking on a new column to sort, reset dir to asc
      if (sortFieldName !== sortField) {
        sortDir = 'asc';
      }
      this.sendAction('action', sortFieldName, sortDir);
    }
  }
});
