import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import Config from 'a2s-client/config/environment';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default Torii.extend({

  torii: service('torii'),
  session: service('session'),

  authenticate() {
    return new RSVP.Promise((resolve, reject) => {
        this._super(...arguments).then((data) => {
            //en data ya viene access token
            //Petición a facebook para traernos el perfil
            ajaxRequestFacebookLogin(data.accessToken).then(function(facebookLogin){
                let picture = facebookLogin.picture.data.url;
                let name = facebookLogin.name;
                let firstName = facebookLogin.first_name;
                 //Hacemos login con el usuario y esperamos la respuesta
                ajaxRequestA2sLoginFb(Config.urlLogin, data.userId, data.accessToken).then(function(a2sLogin){
                    if ( !Ember.isNone(a2sLogin.user.fb.token) && !Ember.isNone(a2sLogin.user._id) ) {
                        //En función de la respuesta resolveremos para autenticar la sesión
                        resolve({
                            //con esto ya autenticamos la sesión
                            access_token: a2sLogin.user.fb.token,
                            provider: data.provider,
                            name: name,
                            firstName: firstName,
                            picture: picture,
                            userId: a2sLogin.user._id
                        });
                    }
                }).catch(reject);
            }).catch(reject);
        
        }, reject);
    });
  }
});