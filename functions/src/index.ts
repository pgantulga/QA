import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
exports.aggregateComments = functions.firestore
    .document('posts/{postId}/answers/{answers}')
    .onWrite((change, context) => {
        const postId = context.params.postId;
        const docRef = admin.firestore().collection('posts').doc(postId);
        return docRef.collection('answers').orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot  => {
                const answersCount = querySnapshot.size;
                const updatedAt = admin.firestore.FieldValue.serverTimestamp();
                const data = {
                    answersCount, updatedAt
                };
                console.log(data);
                return docRef.update(data);
            })
            .catch(error => console.log(error));
    });
exports.voteChange = functions.firestore
    .document('votes/{voteId}')
    .onWrite( (snap, context) => {
        // const voteId = context.params.voteId;
        const increaseBy = admin.firestore.FieldValue.increment(1);
        const newValue = snap.after.data();
        // @ts-ignore
        const postId = newValue.postId;
        // @ts-ignore
        const answerId = newValue.answerId;
        const postRef = admin.firestore().collection('posts/' + postId);
        const batch = admin.firestore().batch();
        // batch.set(likesRef, ...likeData);
        // batch.update(storyRef, { likes: increment });
        // batch.update(userRef, { totalLikes: increment });
        // batch.commit();
    })
