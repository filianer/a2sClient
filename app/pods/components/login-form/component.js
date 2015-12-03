import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  store: service(),

  actions: {
    authenticateWithOAuth2() {
      var password = this.get('passwordLogin');
      var login = this.get('identification');
      this.get('session').authenticate('authenticator:oauth2', login, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    },

    authenticateWithFacebook() {
      this.get('session').authenticate('authenticator:torii', 'facebook');
    },

    register(){
      //TODO añadir comprobaciones
      var that = this;
      var email = {'login':this.get('email'), 'password':this.get('password')};
      var user = {'email':email};
      var newUser = this.get('store').createRecord('user', user);
      newUser.save().then(function(response){
        //TODO: controlar respuesta
        $('#modalRegister').modal('hide');
        Ember.set(that,'email','');
        Ember.set(that,'password','');
      });
 
    }
  }
});