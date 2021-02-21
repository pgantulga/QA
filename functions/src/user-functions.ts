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
    }));

exports.userChanged = functions.firestore
    .document('users/{uid}')
    .onUpdate((change: any) => {
        const newValue = change.after.data();
        const userRef = admin.firestore().collection('users');
        if (newValue.company && newValue.company.isConfirmed.confirmed) {
            return userRef.doc(newValue.uid).set(
                { verified: true }, { merge: true })
        } else if (newValue.company && (newValue.company.isConfirmed.notConfirmed
            || newValue.company.isConfirmed.checking)) {
            return userRef.doc(newValue.uid).set(
                { verified: false}, {merge: true} )
        } else {
            return null;
        }
    }
    )

