//requiring firebase modules
var firebaseAdmin = require('firebase-admin');
var serviceAccount = require('../../angie_app_firebase_key.json')



// initializing firebase
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://angie-app-39bc0.firebaseio.com'
});

const db = firebaseAdmin.firestore();
db.settings({timestampsInSnpashots : true });

module.exports = {
    database:db
}