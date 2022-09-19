"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
// @ts-ignore
const admin = require("firebase-admin");
// const nf = require('./notification-functions');
// add latest log in post to post document.
exports.lastLog = functions.firestore
    .document('posts/{postId}/logs/{log}')
    .onCreate((snap, context) => {
    const postId = context.params.postId;
    const docRef = admin.firestore().collection('posts').doc(postId);
    return docRef.update({
        lastLog: snap.data()
    });
});
// to count answers number and last update time in post document
exports.postUpdate = functions.firestore
    .document('posts/{postId}')
    .onUpdate((change) => {
    decreaseTagNumber(change.before.data());
    increaseTagNumber(change.after.data());
});
// count how many posts in post collection and save to ./metas
exports.postMeta = functions.firestore
    .document('posts/{postId}')
    .onWrite((change, context) => {
    const metaRef = admin.firestore().collection('metas').doc('post');
    const postRef = admin.firestore().collection('posts');
    if (change.before.exists && !change.after.exists) {
        console.log('delete method');
        decreaseTagNumber(change.before.data());
        updateUserPostNumber(change.before.data());
    }
    if (!change.before.exists && change.after.exists) {
        console.log('create method');
        increaseTagNumber(change.after.data());
        updateUserPostNumber(change.after.data());
    }
    return postRef.orderBy('createdAt', 'desc')
        .get()
        .then((snapshot) => {
        const size = snapshot.size;
        const updatedAt = admin.firestore.FieldValue.serverTimestamp();
        const data = {
            size, updatedAt
        };
        return metaRef.update(data);
    });
});
function updateUserPostNumber(post) {
    const userRef = admin.firestore().collection('users').doc(post.uid);
    return admin.firestore().collection('posts').where('uid', '==', post.uid)
        .get()
        .then((snapshot) => {
        return userRef.update({ postNumber: snapshot.size });
    })
        .catch(err => {
        console.log(err);
    });
}
function decreaseTagNumber(post) {
    const decreasedBy = admin.firestore.FieldValue.increment(-1);
    const tagsRef = admin.firestore().collection('tags');
    if (post.tags.length) {
        post.tags.forEach((tag) => {
            tagsRef.doc(tag.id).update({
                totalUsed: decreasedBy
            });
        });
    }
}
function increaseTagNumber(post) {
    const increasedBy = admin.firestore.FieldValue.increment(1);
    const tagsRef = admin.firestore().collection('tags');
    if (post.tags.length) {
        post.tags.forEach((item) => {
            tagsRef.doc(item.id).update({
                totalUsed: increasedBy,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        });
    }
}
//# sourceMappingURL=post-functions.js.map