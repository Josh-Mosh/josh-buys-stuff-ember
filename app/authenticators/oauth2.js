import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: ENV.APP.api_host + '/auth',
});

// import Base from 'ember-simple-auth/authenticators/base';
// export default Base.extend({
//   restore(data) {
//   },

//   authenticate(...args) {
//     console.log('authenticate', 'args:', args);
//   },

//   invalidate(data) {
//   }
// });
