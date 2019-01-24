const functions = require('firebase-functions');
const admin = require('firebase-admin');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');
const requestOneTimePassword = require('./request_one_time_password')
const verifyOneTimePassword = require('./verify_one_time_passowrd');

 /* exports.goodbye = functions.https.onRequest((request,response)=>{
     response.send("Opa tudo tranquilo ai?");
 })  */



 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://beta-one-time-password.firebaseio.com"
  });


 exports.createUser = functions.https.onRequest(createUser);
 exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
 exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);
 

