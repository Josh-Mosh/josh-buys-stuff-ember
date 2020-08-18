import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  session: service(),

  identification: '',
  password: '',
  errorMessage: '',

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');

      if (!identification || !password) {
        this.set('errorMessage', 'Email and Password are required.');
      }

      try {
        this.get('session').authenticate('authenticator:custom', { identification, password });
      } catch(error) {
        this.set('errorMessage', error.error || error);
      }

      // if (this.get('session.isAuthenticated')) {
      //   // What to do with all this success?
      // }
    }
  }
});
