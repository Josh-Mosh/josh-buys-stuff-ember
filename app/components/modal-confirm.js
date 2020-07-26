import $ from 'jquery';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { later } from '@ember/runloop';

export default Component.extend({
  classNameBindings: ['isHidden:custom-hidden'],
  classNames: ['modal-overlay'],
  attributeBindings: ['data-test'],

  keyPress(e) {
    // Return / Enter key.
    if (e.keyCode === 13
      && this.get('submitOnEnter')
      && !this.get('disableButton')
      && !this.get('disabled')
      && !this.get('isWalkthrough')
    ) {
      this.send('submit');
    }
  },

  keyUp: function(e) {
    // Esc Key
    if (e.keyCode === 27) {
      this.send('cancel');
    }
  },

  animation: computed('animationOut', function() {
    return this.get('animationOut') ? 'modal-slide-down' : 'modal-slide-up';
  }),

  animationOut: false,

  focusFirst: observer('isHidden', function() {
    if (this.get('isHidden') === false && this.get('focus') !== false) {
      later(() => {
        this.$('input').first().focus();
      }, 100);
    }
  }),

  // clicking on the overlay will close the modal
  mouseDown(el) {
    if ($(el.target).hasClass('modal-overlay') && !this.get('isWalkthrough')) {
      this.send('cancel');
    }
  },

  actions: {

    // override this action in custom modals if more close action is needed
    cancel() {
      if (this.get('cancelAction')) {
        this.sendAction('cancelAction');
      }
      this.send('slideOut');
    },

    // override this action in custom modals if more submit action is needed
    submit() {
      this.sendAction();
      if (!this.get('isDestroyed')) {
        this.send('slideOut');
      }
    },

    slideOut() {
      if (this.get('isDestroyed')) {
        return;
      }

      this.set('animationOut', true);
      later(() => {
        // there's a slight chance we closed the modal elsewhere or transitioned to another page
        // if so, we get an error if we try to call set on a destroyed object
        if (this.get('isDestroyed')) {
          return;
        }
        this.set('isHidden', true);
        this.set('animationOut', false);
      }, 200);
    }
  }
});
