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
exports.lastLog = functions.firestore
    .document('posts/{postId}/logs/{log}')
    .onCreate((snap, context) => {
        const postId = context.params.postId;
        const docRef = admin.firestore().collection('posts').doc(postId);
        return docRef.update({
            lastLog: snap.data()
        });
    });
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
                return docRef.update(data);
            })
            .catch(error => console.log(error));
    });
exports.voteAdded = functions.firestore
    .document('votes/{voteId}')
    .onCreate( (snap, context) => {
        const increaseBy = admin.firestore.FieldValue.increment(1);
        const newValue = snap.data();
        const batch = admin.firestore().batch();
        batch.update(getPostRef(newValue.postId), {totalVotes: increaseBy});
        batch.update(getAnswerRef(newValue.postId, newValue.answerId), {votesNumber: increaseBy});
        batch.update(getUserRef(newValue.voteReceiver), {votesReceived: increaseBy});
        return batch.commit()
            .then(() => {
                    console.log('Vote added');
                }
            );
    });
exports.voteDeleted = functions.firestore
    .document('votes/{voteId}')
    .onDelete(snapshot => {
            const decreasedBy = admin.firestore.FieldValue.increment(-1);
            const newValue = snapshot.data();
            const batch = admin.firestore().batch();
            batch.update(getPostRef(newValue.postId), {totalVotes: decreasedBy});
            batch.update(getAnswerRef(newValue.postId, newValue.answerId), {votesNumber: decreasedBy});
            batch.update(getUserRef(newValue.voteReceiver), {votesReceived: decreasedBy});
            batch.commit()
                .then(() => {
                            console.log('Vote deleted');
                    }
                );
    });

function getPostRef(postId: string) {
        return admin.firestore().collection('posts').doc(postId);
}
function getUserRef(userId: string) {
        return admin.firestore().collection('users').doc(userId);
}
function getAnswerRef(postId: string, answerId: string) {
       return  admin.firestore().collection('posts').doc(postId).collection('answers').doc(answerId);
}




