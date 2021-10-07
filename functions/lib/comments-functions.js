"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
// @ts-ignore
const admin = require("firebase-admin");
// to count answers number and last update time in post document
exports.aggregateComments = functions.firestore
    .document('posts/{postId}/answers/{answer}')
    .onWrite((change, context) => {
    const postId = context.params.postId;
    const docRef = admin.firestore().collection('posts').doc(postId);
    return docRef.collection('answers').orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
        const answersCount = querySnapshot.size;
        const updatedAt = admin.firestore.FieldValue.serverTimestamp();
        const data = {
            answersCount, updatedAt
        };
        return docRef.update(data);
    })
        .catch((error) => console.log(error));
});
exports.repliesUpdate = functions.firestore
    .document('posts/{postId}/answers/{answerId}/replies/{reply}')
    .onWrite((change, context) => {
    const postId = context.params.postId;
    const answerId = context.params.answerId;
    const answerRef = admin.firestore().collection('posts/' + postId + '/answers').doc(answerId);
    return answerRef.collection('replies').orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
        const repliesCount = querySnapshot.size;
        const updatedAt = admin.firestore.FieldValue.serverTimestamp();
        return answerRef.update({
            repliesCount, updatedAt
        });
    })
        .catch((err) => console.log(err));
});
//# sourceMappingURL=comments-functions.js.map