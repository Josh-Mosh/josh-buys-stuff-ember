import ModalConfirm from './modal-confirm';
import { computed } from '@ember/object';

export default ModalConfirm.extend({

  init() {
    this._super(...arguments);
    this.set('colorOptions', ['light', 'dark']);
  },

  model: computed.alias('properties.model'),

  actions: {
    submit() {
      this.submitAction(this.get('model'));
    }
  }
});
