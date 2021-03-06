import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    const sets = this.get('store').findAll('set');
    const themes = this.get('store').findAll('theme');
    return RSVP.hash({ sets, themes });
  },

  setupController(controller, models) {
    this._super(controller, models.sets);
    controller.setProperties({
      sets: models.sets.sortBy('videoUploaded'),
      themes: models.themes
    });
  }
});
