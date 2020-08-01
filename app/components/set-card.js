import Component from '@ember/component';
import { observer } from '@ember/object';
import HoverMixin from '../mixins/hover';

export default Component.extend(HoverMixin, {
  classNames: ['set-card', 'card', 'clickable', 'no-overflow'],

  mouseOver: observer('hover', function() {
    const hover = this.get('hover');
    if (hover) {
      this.$('img').animate({ height: '100%', width: '100%' });
    } else {
      this.$('img').animate({ height: '95%', width: '95%' });
    }
  }),

  mouseMove() {
    // wait for animation to finish(750ms) then clear queue
    // prevents images bouncing when mousing over and off quickly
    setTimeout(function() {
      this.$('img').clearQueue();
    }, 750);
  },

  click() {
    this.transitionToSet(this.get('set'));
  }

});
