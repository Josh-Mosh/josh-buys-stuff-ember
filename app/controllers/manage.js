import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('newSet', {
      setId: null,
      name: '',
      description: '',
      pieces: '',
      age: '',
      price: ''
    });
  },

  isCreateSetModalHidden: true,

  editing: false,
  setToEdit: null,

  selectedSetProperties: computed('creating', 'editing', 'setToEdit', function() {
    const creating = {
      model: this.get('newSet'),
      title: 'Create Set',
      action: 'createSet',
      confirmText: 'Create'
    };
    const editing = {
      model: this.get('setToEdit') || {},
      title: 'Edit Set',
      action: 'save',
      confirmText: 'Save'
    }

    return this.get('editing') ? editing : creating;
  }),

});
