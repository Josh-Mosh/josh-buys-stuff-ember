import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  collapsed: true,

  clampedDescription: computed('description', 'collapsed', function() {
    let description = this.get('description') || '';

    if (this.get('collapsed')) {
      return description.substr(0, 180).trim().concat("...");
    }

    return description;
  }),

  actions: {
    toggleCollapsed() {
      let collapsed = this.get('collapsed');
      this.set('collapsed', !collapsed);
    }
  }
});
