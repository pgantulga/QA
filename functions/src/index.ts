import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
 // add latest log to post document
exports.lastLog = functions.firestore
    .document('posts/{postId}/logs/{log}')
    .onCreate((snap, context) => {
        const postId = context.params.postId;
        const docRef = admin.firestore().collection('posts').doc(postId);
        return docRef.update({
            lastLog: snap.data()
        });
    });
// count how many posts in post collection
exports.postMeta = functions.firestore
    .document('posts/{postId}')
    .onWrite((change, context) => {
        if ( change.after.exists && change.before.exists) {
            console.log('update method');
            if (checkTagUpdate(change.before.data(), change.after.data())) {
                decreaseTagNumber(change.before.data());
                increaseTagNumber(change.after.data());
            }
            return null;
        }
        console.log('create or delete methods');
        if (change.before.exists) {
            decreaseTagNumber(change.before.data());
        }
        if (change.after.exists) {
            increaseTagNumber(change.after.data());
        }
        const metaRef = admin.firestore().collection('metas').doc('post');
        const postRef = admin.firestore().collection('posts');
        return postRef.orderBy('createdAt', 'desc')
            .get()
            .then(snapshot => {
                const size = snapshot.size;
                const updatedAt = admin.firestore.FieldValue.serverTimestamp();
                const data = {
                    size, updatedAt
                };
                return metaRef.update(data);
            });
    });
// to count answers number and last update time in post document
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
// changing by batch to operation post/totalVotes, answer/votesNumber, user/votesReceived when vote added
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
// changing by batch operation to post/totalVotes, answer/votesNumber, user/votesReceived when vote added
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
//to count how many times that tag used, need to change tag/used doc every time when post created/deleted
function getPostRef(postId: string) {
        return admin.firestore().collection('posts').doc(postId);
}
function getUserRef(userId: string) {
        return admin.firestore().collection('users').doc(userId);
}
function getAnswerRef(postId: string, answerId: string) {
       return  admin.firestore().collection('posts').doc(postId).collection('answers').doc(answerId);
}
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
function checkTagUpdate(oldPost: any, newPost: any) {
    if (oldPost.tags.length !== newPost.tags.length) {
        return true;
    }
    for (const [i, o] of oldPost.tags) {
        for (const [j, n] of newPost.tags) {
            console.log(i, o, j, n);
            if (o === n) {
                break;
            }
            if ( j === newPost.tags.length - 1 ) {
                return true;
            }
        }
    }
    return false;
}


