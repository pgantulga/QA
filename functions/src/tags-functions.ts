const functions = require('firebase-functions');
// @ts-ignore
import * as admin from 'firebase-admin';

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
                console.log('error gettind doc: ', err);
            });
    });

// to count how many times that tag used, need to change tag/used doc every time when post created/deleted
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
//
// function getAllTags() {
//     const tags = admin.firestore().collection('tags');
//     tags.get()
//
// }


// function checkTagUpdate(oldPost: any, newPost: any) {
//     if (oldPost.tags.length !== newPost.tags.length) {
//         return true;
//     }
//     for (const [i, o] of oldPost.tags) {
//         for (const [j, n] of newPost.tags) {
//             console.log(i, o, j, n);
//             if (o === n) {
//                 break;
//             }
//             if ( j === newPost.tags.length - 1 ) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
