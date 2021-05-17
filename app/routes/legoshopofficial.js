import Route from '@ember/routing/route';
import ENV from '../config/environment';

export default Route.extend({
  redirect() {
    const affiliateLink = ENV.APP.affiliate_lego;
    if (!affiliateLink) {
      this.transitionTo('home');
    }
    window.location.href = affiliateLink;
  }
});
