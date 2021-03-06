import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';
// import ENV from '../config/environment';
// import $ from 'jquery';

export default Base.extend({

  ajax: service(),

  restore: function(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(creds) {
    let ajax = this.get('ajax');

    return new RSVP.Promise((resolve, reject) => {
      ajax.post('auth', {
        data: JSON.stringify({
          email: creds.identification,
          password: creds.password
        }),
        contentType: 'application/json',
      })
      .then(response => {
        run(() => {
          console.log('resolve', 'response.token:', response);
          resolve({ token: response.token, user_id: response.user.id });
        });
      })
      .catch(error => {
        // Return error as XHR object
        run(() => {
          reject(error);
        });
      });
    });
  }

});
