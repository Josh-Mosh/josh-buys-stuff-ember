import Component from '@ember/component';
import { observer } from '@ember/object';
import HoverMixin from '../mixins/hover';

export default Component.extend(HoverMixin, {
  classNames: ['set-card', 'col-lg-4', 'col-md-6'],

  mouseOver: observer('hover', function() {
    const hover = this.get('hover');
    if (hover) {
      this.$('img').animate({ height: '190px' });
    } else {
      this.$('img').animate({ height: '180px' });
    }
  }),

  mouseMove() {
    // wait for animation to finish(400ms) then clear queue
    // prevents menu bouncing when mousing over and off quickly
    setTimeout(function() {
      this.$('img').clearQueue();
    }, 500);
  },
});
