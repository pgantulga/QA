"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
// @ts-ignore
const admin = require("firebase-admin");
exports.tagCreated = functions.firestore
    .document('tags/{tagId}')
    .onWrite((snapshot) => {
    const metaRef = admin.firestore().collection('metas').doc('tag');
    const tagsRef = admin.firestore().collection('tags');
    return tagsRef.orderBy('createdAt', 'desc')
        .get()
        .then((tags) => {
        return metaRef.set({
            size: tags.size,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    });
});
// launches when tag info changed and update posts which contain that tag
exports.tagChanged = functions.firestore
    .document('tags/{tagId}')
    .onUpdate((change, context) => {
    const newValue = change.after.data();
    const oldValue = change.before.data();
    const postRef = admin.firestore().collection('posts');
    postRef.where('tags', 'array-contains', { id: oldValue.id, name: oldValue.name }).get()
        .then((query) => {
        query.forEach((item) => {
            item.ref.set({
                tags: updatePostTagArray(item.data(), newValue)
            }, { merge: true })
                .then((res) => {
                console.log('Tag updated: ', item.data().id);
            });
        });
    })
        .catch((err) => {
        console.log('error getting doc: ', err);
    });
});
function updatePostTagArray(postValue, newValue) {
    const array = [];
    for (const item of postValue.tags) {
        if (item.id === newValue.id) {
            array.push({
                id: newValue.id,
                name: newValue.name
            });
        }
        else {
            array.push({
                id: item.id,
                name: item.name
            });
        }
    }
    return array;
}
//# sourceMappingURL=tags-functions.js.map