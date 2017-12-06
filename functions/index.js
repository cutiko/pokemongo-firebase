const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.nearPokestop = functions.https.onRequest((request, response) => {
    
});

