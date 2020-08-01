import Route from '@ember/routing/route';
// import RSVP from 'rsvp';

export default Route.extend({

  model(params) {
    return this.get('store').query('set', { setId: params.setId })
    .then((sets) => {
      console.log('then', 'sets:', sets)
      return sets.length ? sets.firstObject : {};
    });
    // const themes = this.get('store').findAll('theme');
    // return RSVP.hash({ sets, themes });
    // return set;
  },

  // setupController(controller, models) {
  //   controller.setProperties({
  //     sets: models.sets,
  //     themes: models.themes
  //   });
  // }

});
