import Mixin from '@ember/object/mixin';
import { computed, set } from '@ember/object';

export default Mixin.create({
  hover: false,
  classNameBindings: ['hover'],

  mouseEnter() {
    set(this, 'hover', true);
  },

  mouseLeave() {
    set(this, 'hover', false);
  },

  visible: computed('hover', function() {
    return this.get('hover') ? 'visible' : 'invisible';
  }),

});
