const functions = require('firebase-functions');
// @ts-ignore
import * as admin from 'firebase-admin';

// add latest log in post to post document.
exports.lastLog = functions.firestore
    .document('posts/{postId}/logs/{log}')
    .onCreate((snap: any, context: any) => {
        const postId = context.params.postId;
        const docRef = admin.firestore().collection('posts').doc(postId);
        return docRef.update({
            lastLog: snap.data()
        });
    });

// to count answers number and last update time in post document
exports.postUpdate = functions.firestore
    .document('posts/{postId}')
    .onUpdate((change: any) => {
        decreaseTagNumber(change.before.data());
        increaseTagNumber(change.after.data());
    });
// count how many posts in post collection and save to ./metas
exports.postMeta = functions.firestore
    .document('posts/{postId}')
    .onWrite((change: any, context: any) => {
        // if ( change.after.exists && change.before.exists) {
        //     console.log('update method');
        //     decreaseTagNumber(change.before.data());
        //     increaseTagNumber(change.after.data());
        //     // if (checkTagUpdate(change.before.data(), change.after.data())) {
        //     //
        //     // }
        //     return null;
        // }
        console.log('create or delete methods');
        if (change.before.exists && !change.after.exists ) {
            decreaseTagNumber(change.before.data());
        }
        if (!change.before.exists && change.after.exists) {
            increaseTagNumber(change.after.data());
        }
        const metaRef = admin.firestore().collection('metas').doc('post');
        const postRef = admin.firestore().collection('posts');
        return postRef.orderBy('createdAt', 'desc')
            .get()
            .then((snapshot: any) => {
                const size = snapshot.size;
                const updatedAt = admin.firestore.FieldValue.serverTimestamp();
                const data = {
                    size, updatedAt
                };
                return metaRef.update(data);
            });
    });

function decreaseTagNumber(post: any) {
    const decreasedBy = admin.firestore.FieldValue.increment(-1);
    const tagsRef = admin.firestore().collection('tags');
    if (post.tags.length) {
        post.tags.forEach( (tag: any) => {
            tagsRef.doc(tag.id).update({
                totalUsed: decreasedBy
            });
        });
    }
}

function increaseTagNumber(post: any) {
    const increasedBy = admin.firestore.FieldValue.increment(1);
    const tagsRef = admin.firestore().collection('tags');
    if (post.tags.length) {
        post.tags.forEach((item: any) => {
            tagsRef.doc(item.id).update({
                totalUsed: increasedBy
            });
        });
    }
}
