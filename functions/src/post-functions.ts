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
        const metaRef = admin.firestore().collection('metas').doc('post');
        const postRef = admin.firestore().collection('posts');
        // if ( change.after.exists && change.before.exists) {
        //     console.log('update method');
        //     decreaseTagNumber(change.before.data());
        //     increaseTagNumber(change.after.data());
        //     // if (checkTagUpdate(change.before.data(), change.after.data())) {
        //     //
        //     // }
        //     return null;
        // }

        if (change.before.exists && !change.after.exists) {
            console.log('delete method');
            decreaseTagNumber(change.before.data());
            updateUserPostNumber(change.before.data());
        }
        if (!change.before.exists && change.after.exists) {
            console.log('create method');
            increaseTagNumber(change.after.data());
            updateUserPostNumber(change.after.data());
            getTagFollowers(change.after.data());

        }

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


function updateUserPostNumber(post: any): any {
    const userRef = admin.firestore().collection('users').doc(post.uid);
    return admin.firestore().collection('posts').where('uid', '==', post.uid)
        .get()
        .then((snapshot: any) => {
            return userRef.update({postNumber: snapshot.size});
        })
        .catch(err => {
            console.log(err);
        });
}

function decreaseTagNumber(post: any) {
    const decreasedBy = admin.firestore.FieldValue.increment(-1);
    const tagsRef = admin.firestore().collection('tags');
    if (post.tags.length) {
        post.tags.forEach((tag: any) => {
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

function getTagFollowers(post: any) {
    const followers: any[] = [];
    if (post.tags.length) {
        for (const tag of post.tags) {
            followers.concat(get(tag));
        }
    }
    return followers;
}

async function get(tag: any) {
    const tagsRef = admin.firestore().collection('tags');
    const tagFollowers: any [] = [];
    const followers = await tagsRef.doc(tag.id).collection('followers').get();
    for (const follower of followers.docs) {
        tagFollowers.push(follower.data());
    }
    return tagFollowers;
}
