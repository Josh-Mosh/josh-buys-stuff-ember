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
  isDeleteSetModalHidden: true,

  editing: false,
  setToEdit: null,
  setToDelete: null,

  selectedSetProperties: computed('creating', 'editing', 'setToEdit', function() {
    const creating = {
      model: this.get('newSet'),
      title: 'Create Set',
      submitAction: 'createSet',
      confirmText: 'Create'
    };
    const editing = {
      model: this.get('setToEdit') || {},
      title: 'Edit Set',
      submitAction: 'updateSet',
      confirmText: 'Save'
    }

    return this.get('editing') ? editing : creating;
  }),

  actions: {
    openEditSetModal(set) {
      this.set('setToEdit', set);
      this.set('editing', true);
      this.set('creating', false);
      this.set('isCreateSetModalHidden');
    },

    openDeleteSetModal(set) {
      this.set('setToDelete', set);
      this.set('isDeleteSetModalHidden', false);
    },

    createSet(set) {
      console.log('createSet', 'set:', set)

    },

    updateSet(set) {
      console.log('updateSet', 'set:', set)

    },

    deleteSet(set) {
      console.log('deleteSet', 'set:', set)

    }
  }
});
