import ModalConfirm from './modal-confirm';
import { computed } from '@ember/object';

export default ModalConfirm.extend({
  model: computed.alias('properties.model'),

  videoSrc: computed('model.videoId', function() {
    const videoId = this.get('model.videoId');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }),

  actions: {
    submit() {
      this.submitAction(this.get('model'));
    }
  }
});
