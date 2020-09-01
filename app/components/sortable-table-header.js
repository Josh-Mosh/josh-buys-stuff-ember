import Component from '@ember/component';

export default Component.extend({
  tagName: 'thead',
  classNames: ['sortableHeaders'],

  actions: {
    sortBy(sortField, sortDir) {
      this.setProperties({
        sortField: sortField,
        sortDir: sortDir
      });
    }
  }
});
