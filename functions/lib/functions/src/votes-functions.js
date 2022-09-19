"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
// @ts-ignore
const admin = require("firebase-admin");
// changing by batch to operation post/totalVotes, answer/votesNumber, user/votesReceived when vote added
exports.voteAdded = functions.firestore
    .document('votes/{voteId}')
    .onCreate((snap, context) => {
    const increaseBy = admin.firestore.FieldValue.increment(1);
    const newValue = snap.data();
    const batch = admin.firestore().batch();
    batch.update(getPostRef(newValue.postId), { totalVotes: increaseBy });
    (newValue.type === 'answer') ? batch.update(getAnswerRef(newValue.postId, newValue.answerId), { votesNumber: increaseBy })
        : batch.update(getPostRef(newValue.postId), { votesNumber: increaseBy });
    batch.update(getUserRef(newValue.voteReceiver), { votesReceived: increaseBy });
    return batch.commit()
        .then(() => {
        console.log('Vote added');
    });
});
// changing by batch operation to post/totalVotes, answer/votesNumber, user/votesReceived when vote added
exports.voteDeleted = functions.firestore
    .document('votes/{voteId}')
    .onDelete((snapshot) => {
    const decreasedBy = admin.firestore.FieldValue.increment(-1);
    const newValue = snapshot.data();
    const batch = admin.firestore().batch();
    batch.update(getPostRef(newValue.postId), { totalVotes: decreasedBy });
    (newValue.type === 'answer') ? batch.update(getAnswerRef(newValue.postId, newValue.answerId), { votesNumber: decreasedBy })
        : batch.update(getPostRef(newValue.postId), { votesNumber: decreasedBy });
    batch.update(getUserRef(newValue.voteReceiver), { votesReceived: decreasedBy });
    batch.commit()
        .then(() => {
        console.log('Vote deleted');
    });
});
function getPostRef(postId) {
    return admin.firestore().collection('posts').doc(postId);
}
function getUserRef(userId) {
    return admin.firestore().collection('users').doc(userId);
}
function getAnswerRef(postId, answerId) {
    return admin.firestore().collection('posts').doc(postId).collection('answers').doc(answerId);
}
//# sourceMappingURL=votes-functions.js.map