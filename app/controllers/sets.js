import Controller from '@ember/controller';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  store: service(),

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

  isEditSetModalHidden: true,
  isDeleteSetModalHidden: true,

  editing: false,
  setToEdit: null,
  setToDelete: null,

  sets: computed.reads('model'),

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

  // setUnavailable: computed('set.archived', 'set.hasAffiliateLink', function() {
  //   return !this.get('')
  // }),

  actions: {
    openCreateSetModal() {
      this.setProperties({
        setToEdit: this.get('newSet'),
        creating: true,
        editing: false,
        isEditSetModalHidden: false
      })
    },

    openEditSetModal(set) {
      this.set('setToEdit', set);
      this.set('editing', true);
      this.set('creating', false);
      this.set('isEditSetModalHidden', false);
    },

    openDeleteSetModal(set) {
      this.set('setToDelete', set);
      this.set('isDeleteSetModalHidden', false);
    },

    createSet(set) {
      console.log('createSet', 'set:', set)
      if (!set) return;
      this.get('store').createRecord('set', set).save().then(
        () => {
          this.set('isEditSetModalHidden', true);
          this.set('newSet', {});
        }, (err) => {
          console.log('err ', err);
        }
      );
    },

    updateSet(set) {
      if (!set) return;
      console.log('updateSet', 'set:', set);
      set.save().then(() => {
        this.set('isEditSetModalHidden', true);
      }, (err) => {
        console.log('err ', err);
      });
    },

    deleteSet() {
      console.log('deleteSet', 'set:', this.get('setToDelete'));
      const setToDelete = this.get('setToDelete');
      if (!setToDelete) return;
      setToDelete.deleteRecord();
      setToDelete.save().then(() => {
        this.set('isDeleteSetModalHidden', true);
      });
    }
  }
});
