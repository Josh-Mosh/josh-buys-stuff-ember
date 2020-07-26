import Component from '@ember/component';
import HoverMixin from '../mixins/hover';

export default Component.extend(HoverMixin, {
  tagName: 'tr'
});
