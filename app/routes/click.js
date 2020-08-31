import Route from '@ember/routing/route';
// import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    if (!params || !params.set_id) {
      this.transitionTo('home');
    }

    return this.get('store').query('set', { setId: params.set_id })
    .then((sets) => {
      let set = sets.length ? sets.firstObject : {};
      if (set && set.affiliateLink) {
        return window.location.href = set.affiliateLink;
      }
      return this.transitionTo('home');
    });
  }
});
