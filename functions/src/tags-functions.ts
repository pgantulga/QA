const functions = require('firebase-functions');
// @ts-ignore
import * as admin from 'firebase-admin';


exports.tagCreated = functions.firestore
    .document('tags/{tagId}')
    .onWrite((snapshot: any) => {
        const metaRef = admin.firestore().collection('metas').doc('tag');
        const tagsRef = admin.firestore().collection('tags');
        return tagsRef.orderBy('createdAt', 'desc')
            .get()
            .then((tags: any) => {
                return metaRef.set({
                    size: tags.size,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                },{merge: true});
            });
    });

// launches when tag info changed and update posts which contain that tag
exports.tagChanged = functions.firestore
    .document('tags/{tagId}')
    .onUpdate( (change: any, context: any) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();
        const postRef = admin.firestore().collection('posts');
        postRef.where('tags', 'array-contains', {id: oldValue.id, name: oldValue.name}).get()
            .then((query: any) => {
                query.forEach((item: any) => {
                    item.ref.set({
                        tags: updatePostTagArray(item.data(), newValue)
                    }, {merge: true})
                        .then((res: any) => {
                            console.log('Tag updated: ', item.data().id);
                        });
                });
            })
            .catch((err: any) => {
                console.log('error getting doc: ', err);
            });
    });

function updatePostTagArray( postValue: any, newValue: any) {
    const array = [];
    for ( const item of postValue.tags) {
        if (item.id === newValue.id) {
            array.push({
                id: newValue.id,
                name: newValue.name
            });
        } else {
            array.push( {
                id: item.id,
                name: item.name
            });
        }
    }
    return array;
}
