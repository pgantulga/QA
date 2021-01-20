const functions = require('firebase-functions');
// @ts-ignore
import * as admin from 'firebase-admin';

exports.userCreated = functions.firestore
    .document('users/{uid}')
    .onCreate(((snapshot: any, context: any) => {
        const userRef = admin.firestore().collection('users');
        const tagsRef = admin.firestore().collection('tags');
        return tagsRef.get()
            .then((query: any) => {
                const tagsArray = {};
                query.forEach((item: any) => {
                    // @ts-ignore
                    tagsArray[item.data().id] = true;
                    return addToTagsFollowers(context.params.uid, item.id);
                });
                return userRef.doc(context.params.uid).set({
                    tags: tagsArray
                }, {merge: true});
            });
    } ));

function addToTagsFollowers(userId: any, tagId: any) {
    const tagsRef = admin.firestore().collection('tags');
    return tagsRef.doc(tagId).collection('followers').add({uid: userId});
}
