const functions = require("firebase-functions");
const mainJsFile = require('../dist/server/main');
exports.ssr = functions.https.onRequest(mainJsFile.app());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
  