import ModalConfirm from './modal-confirm';
import { computed } from '@ember/object';

export default ModalConfirm.extend({
  model: computed.alias('properties.model'),

  actions: {
    submit() {
      this.submitAction(this.get('model'));
    }
  }
});
