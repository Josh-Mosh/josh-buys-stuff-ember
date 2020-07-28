import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  session: service(),
  host: ENV.APP.api_host,

  authorize(xhr) {
    let { token } = this.get('session.data.authenticated');
    xhr.setRequestHeader('access_token', token);
  },

  headers: computed('session.data.authenticated.token', function() {
    const token = this.get('session.data.authenticated.token');
    if (!token) {
      return {};
    }
    return {
      access_token: token,
      Authorization: `Bearer ${token}`
    }
  }),

  // ensureResponseAuthorized(status, headers, payload, requestData) {
  //   console.log('status', status);
  //   console.log('headers', headers);
  //   console.log('payload', payload);
  //   console.log('requestData', requestData);
  // }
});
