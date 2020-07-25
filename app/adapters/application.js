import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  host: ENV.APP.api_host,
  authorize(xhr) {
    let { token } = this.get('session.data.authenticated');
    xhr.setRequestHeader('access_token', token);
  }
});
