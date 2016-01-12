/*
    Petición de perfil a facebook
*/
function ajaxRequestFacebookLogin(accessToken){
    return new Promise(function(resolve,reject){
        Ember.$.ajax({
            url:'https://graph.facebook.com/me?fields=picture,name,first_name&access_token='+accessToken,
            type:'Get'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
};

/*
    Login a2s con facebook
*/
function ajaxRequestA2sLoginFb(url, userId, accessToken){
    return new Promise(function(resolve,reject){
        Ember.$.ajax({
            url:url,
            type:'POST',
            data: JSON.stringify({'user':{"fb":{"id":userId,"token":accessToken}},"type":"fb"}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
};

/*
    Login a2s con email
*/
function ajaxRequestA2sLoginEmail(url, login, password){
    return new Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            data: JSON.stringify({'user':{"email":{"login":login,"password":password}},"type":"mail"}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
};


/*
    Sube un archivo a una url
    params:
        -url: url
        -tag: en nuestro caso el userId
        -file: archivo que queremos subir
        -path: ruta y nombre de archivo, tal cual como queremos que se guarde en el servidor
*/
function ajaxRequestUploadFile(url, tag, file, path){
    var formData = new FormData();
    formData.append(tag, file);
    formData.append('path', path);
    return new Promise(function(resolve,reject){
        Ember.$.ajax({
            url: url,
            type:'POST',
            data: formData,
            cache:false,
            contentType: false,
            processData: false
        }).then(function(response){
            resolve(response);
        }, function(error){
            reject(error);
        });
    });
}
