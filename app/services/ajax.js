import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

import { inject as service } from '@ember/service';

import { computed } from '@ember/object';

export default AjaxService.extend({
  host: ENV.APP.api_host,
  session: service(),
  headers: computed('session.data.authenticated.access_token', {
    get() {
      let headers = {};
      const authToken = this.get('session.data.authenticated.access_token');
      if (authToken) {
        headers['access_token'] = authToken;
      }
      return headers;
    }
  })
});
