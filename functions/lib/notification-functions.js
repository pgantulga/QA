"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
// @ts-ignore
const admin = require("firebase-admin");
exports.notificationCreated = functions.firestore
    .document('notifiers/{notifierId}')
    .onCreate((snap, context) => {
    const notifierData = snap.data();
    const message = {
        tokens: [],
        notification: {
            title: getMessageTitle(notifierData),
            body: notifierData.message,
            image: 'https://firebasestorage.googleapis.com/v0/b/qaproject-23417.appspot.com/o/FCMImages%2Fnotif_image.jpg?alt=media&token=c74eeb3f-d39d-4399-9a96-f32447fdbfd4'
        },
        data: {
            actor: notifierData.actor
        },
        webpush: {
            fcmOptions: {
                link: (notifierData.parent) ? 'https://uurkhaichin.mn/posts/' + notifierData.parent : 'https://uurkhaichin.mn/'
            }
        }
    };
    getUserData(notifierData.notifier)
        .then((docSnapshot) => {
        if (!docSnapshot.exists) {
            return null;
        }
        if (!docSnapshot.data().notificationTokens) {
            console.log('no token');
            return null;
        }
        message.tokens = message.tokens.concat(docSnapshot.data().notificationTokens);
        console.log(message.tokens.length);
        return admin.messaging().sendMulticast(message)
            .then((res) => {
            console.log(res.successCount + ' messages sent');
        });
    });
});
function getUserData(uid) {
    const userRef = admin.firestore().collection('users').doc(uid);
    return userRef.get();
}
function getMessageTitle(obj) {
    if (obj.entity_type === 1) {
        return 'Шинэ хэлэлцүүлэг';
    }
    if (obj.entity_type === 2) {
        return 'Хэлэлцүүлэгт засвар орлоо';
    }
    if (obj.entity_type === 3) {
        return 'Хэлэлцүүлэг устгагдлаа';
    }
    if (obj.entity_type === 4) {
        return 'Хариулт нэмэгдлээ';
    }
    if (obj.entity_type === 5) {
        return 'Хариулт нэмэгдлээ';
    }
    return 'Шинэ мэдэгдэл';
}
//# sourceMappingURL=notification-functions.js.map