import Controller from '@ember/controller';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  store: service(),

  init() {
    this._super(...arguments);
    this.set('newTheme', {
      name: '',
      logoUrl: ''
    });
  },

  isEditThemeModalHidden: true,
  isDeleteThemeModalHidden: true,

  editing: false,
  themeToEdit: null,
  themeToDelete: null,

  selectedThemeProperties: computed('creating', 'editing', 'themeToEdit', function() {
    const creating = {
      model: this.get('newTheme'),
      title: 'Create Theme',
      submitAction: 'createTheme',
      confirmText: 'Create'
    };
    const editing = {
      model: this.get('themeToEdit') || {},
      title: 'Edit Theme',
      submitAction: 'updateTheme',
      confirmText: 'Save'
    }

    return this.get('editing') ? editing : creating;
  }),

  actions: {
    openCreateThemeModal() {
      this.setProperties({
        themeToEdit: this.get('newTheme'),
        creating: true,
        editing: false,
        isEditThemeModalHidden: false
      })
    },

    openEditThemeModal(theme) {
      this.set('themeToEdit', theme);
      this.set('editing', true);
      this.set('creating', false);
      this.set('isEditThemeModalHidden', false);
    },

    openDeleteThemeModal(theme) {
      this.set('themeToDelete', theme);
      this.set('isDeleteThemeModalHidden', false);
    },

    createTheme(theme) {
      console.log('createTheme', 'theme:', theme);
      if (!theme) return;
      this.get('store').createRecord('theme', theme).save().then(() => {
        this.set('newTheme', {});
        this.set('isEditThemeModalHidden', true);
      });
    },

    updateTheme(theme) {
      if (!theme) return;
      console.log('updateTheme', 'theme:', theme);
      theme.save().then(() => {
        this.set('isEditThemeModalHidden', true);
      });
    },

    deleteTheme() {
      console.log('deleteTheme', 'theme:', this.get('themeToDelete'));
      const themeToDelete = this.get('themeToDelete');
      if (!themeToDelete) return;
      themeToDelete.deleteRecord();
      themeToDelete.save().then(() => {
        this.set('isDeleteThemeModalHidden', true);
      });
    }
  }
});
