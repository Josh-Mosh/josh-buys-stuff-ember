import ModalConfirm from './modal-confirm';
import { computed } from '@ember/object';
import $ from 'jquery';

export default ModalConfirm.extend({
  model: computed.alias('properties.model'),

  actions: {
    submit() {
      this.submitAction(this.get('model'));
    },

    populateLinks(fullLink) {
      if (!fullLink) return;

      let htmlLink = $.parseHTML(fullLink).findBy('nodeName', 'A');
      let href = htmlLink.href ? htmlLink.href : '';
      this.set('model.affiliateLink', href);

      let image = $.parseHTML(htmlLink.innerHTML).findBy('nodeName', 'IMG');
      let src = image.src ? image.src : '';
      this.set('model.imgUrl', src);
    },

    onDateSelect(selectedDates, dateStr, /*instance*/) {
      let date = dateStr || '';
      if (!date) return;
      this.set('model.videoUploaded', new Date(date));
    }
  }
});
