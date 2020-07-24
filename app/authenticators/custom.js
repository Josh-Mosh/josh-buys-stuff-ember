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
    return new RSVP.Promise(function(resolve, reject) {
      if (!isEmpty(data.access_token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(creds) {

    let ajax = this.get('ajax');
    // let credentials = $.param({ email: creds.identification, password: creds.password });

    return new RSVP.Promise((resolve, reject) => {
      ajax.post('auth', {
        data: JSON.stringify({
          email: creds.identification,
          password: creds.password
        }),
        contentType: 'application/json',
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // transformRequest: function(obj) {
        //   var str = [];
        //   for(var p in obj)
        //   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        //   return str.join("&");
        // },
        // data: credentials
      })
      .then(response => {
        console.log('then', 'response:', response);
        run(() => {
          resolve({ access_token: response.login.access_token });
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
