const functions = require('firebase-functions');
// @ts-ignore
import * as admin from 'firebase-admin';
// to count answers number and last update time in post document
exports.aggregateComments = functions.firestore
    .document('posts/{postId}/answers/{answers}')
    .onWrite((change: any, context: any) => {
        const postId = context.params.postId;
        const docRef = admin.firestore().collection('posts').doc(postId);
        return docRef.collection('answers').orderBy('createdAt', 'desc')
            .get()
            .then((querySnapshot: any)  => {
                const answersCount = querySnapshot.size;
                const updatedAt = admin.firestore.FieldValue.serverTimestamp();
                const data = {
                    answersCount, updatedAt
                };
                return docRef.update(data);
            })
            .catch((error: any) => console.log(error));
    });
