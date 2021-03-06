import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Config from 'a2s-client/config/environment';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default OAuth2PasswordGrant.extend({
	authenticate(identification, password, scope = []) {
		return new RSVP.Promise((resolve, reject) => {

			ajaxRequestA2sLoginEmail(Config.urlLogin, identification, password).then(function(a2sLogin){
				if ( !Ember.isNone(a2sLogin.user.email) && !Ember.isNone(a2sLogin.user._id) ) {
					//En función de la respuesta resolveremos para autenticar la sesión
					//a la sessión le hace falta un token para quedar autenticada y que al refrescar la página siga estando logueado
					//si no viene ponemos uno inventado o generamos uno aleatorio ya que no lo queremos para nada más
					let accessToken = Ember.isNone(a2sLogin.accessToken) ? "123456" : a2sLogin.accessToken;
					var resp = {access_token:accessToken, userId: a2sLogin.user._id};
					if ( !Ember.isNone(a2sLogin.user.name) ) {
						resp['name'] = a2sLogin.user.name;
					}
					if ( !Ember.isNone(a2sLogin.user.firstName) ) {
						resp['firstName'] = a2sLogin.user.firstName;
					}
					resolve(resp);
				}
			}).catch(reject);
		});
	},
});