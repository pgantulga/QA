const functions = require('firebase-functions');
// @ts-ignore
import * as admin from 'firebase-admin';

exports.userCreated = functions.firestore
    .document('users/{uid}')
    .onCreate(((snapshot: any) => {
        const metaRef = admin.firestore().collection('metas').doc('user');
        const userRef = admin.firestore().collection('users');
        return userRef.orderBy('createdAt', 'desc')
            .get()
            .then(snapshot => {
                const size = snapshot.size;
                const updatedAt = admin.firestore.FieldValue.serverTimestamp();
                return metaRef.update({
                    size, updatedAt
                })
            })
    } ));

