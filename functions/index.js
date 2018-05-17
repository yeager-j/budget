const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./budget-8ed96-firebase-adminsdk-mg4oe-0a1b9a3ded.json');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://budget-8ed96.firebaseio.com"
});

exports.createExpense = functions.firestore
  .document('periods/{pid}/expenses/{eid}')
  .onCreate((snap, ctx) => {
    const data = snap.data();
    const db = admin.firestore();
    return db.collection('goals', ref => ref.where('name', '==', data.category))
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().name === data.category) {
            doc.ref.update({
              balance: +doc.data().balance + +data.amount
            });
          }
        });
      })
      .catch(e => console.error(e));
  });
