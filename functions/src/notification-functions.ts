// const functions = require('firebase-functions');
// @ts-ignore
import * as admin from 'firebase-admin';
const notificationObjectsRef = admin.firestore().collection('notificationObjects');
// const notificationActorsRef = admin.firestore().collection('notificationActors');
const notificationNotifiersRef = admin.firestore().collection('notificationNotifiers');



// exports.notificationPostCreated = functions.firestore
//     .document('posts/{postId}')
//     .onWrite((change: any, context: any) => {
//             if (change.before.exists && !change.after.exists) {
//                 console.log('notification:post delete method');
//             }
//             if (!change.before.exists && change.after.exist) {
//                 console.log('notification:post create method');
//                 createNotificationObject(change.after.exist)
//                     .then( res => {
//                         addNotificationNotifiers(res.id, change.after.exist)
//                             .then((respond: any) => {
//                                 console.log('Notififcation notifier created: ', respond);
//                             });
//                         addNotificationActor(res.id, change.after.exist)
//                             .then((response: any) => {
//                                 console.log('Notification actor created: ', response);
//                             });
//                     });
//             }
//             console.log('post update method');
//
//
//     });
exports.createNotificationObject = createNotificationObject;
exports.addNotificationNotifiers = addNotificationNotifiers;
exports.createNotificationNotifier = createNotificationNotifier;
function createNotificationObject(postData: any): Promise<any> {
    return notificationObjectsRef.add(
        {
            entity: postData.id,
            entity_type: 1,
            type: 'post',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 1
        }
    )
        .then(res => {
            res.update({
                id: res.id
            });
            return res;
        })
        .catch(err => {
            console.log(err);
        })
}
function addNotificationNotifiers(id: any, postData: any): Promise<any> {
    const followers = admin.firestore().collection('posts').doc(postData.id).collection('followers');
    return followers.get()
        .then((querySnapshot: any) => {
            querySnapshot.forEach((item: any) => {
                 return createNotificationNotifier(id, item.data().uid);
            });
        })
        .catch(err => {
            console.log(err);
        });
}
function createNotificationNotifier(id: any, uid: any): Promise<any> {
     return notificationNotifiersRef.add(
         {
             notificationObjectId: id,
             notifier: uid,
             status: 1
         })
         .then(res => {
             return res.update({
                 id: res.id
             });
         })
         .catch(err => {
             console.log(err);
         })
}

export function addNotificationActor(id: any, postData: any) {
    return notificationNotifiersRef.add(
        {
            notificationObjectId: id,
            actor: postData.uid,
            status: 1
        }
    )
        .then(res => {
            return res.update({
                id: res.id
            });
        });
}

