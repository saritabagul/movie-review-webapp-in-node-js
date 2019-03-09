// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '2066219413462213', // your App ID
        'clientSecret'    : '4be52f53ec15b6ba699a4226f1f41b1e', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

    // 'twitterAuth' : {
    //     'consumerKey'        : 'your-consumer-key-here',
    //     'consumerSecret'     : 'your-client-secret-here',
    //     'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    // },

    'googleAuth' : {
        'clientID'         : '757268445153-cc6tpcocv8dkmmu6b6jrq0e4ff3udhkn.apps.googleusercontent.com',
        'clientSecret'     : '4tJaN1kRmIBVfn_5iTPhSwQG',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
