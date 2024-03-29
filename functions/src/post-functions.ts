const functions = require("firebase-functions");
// @ts-ignore
import * as admin from "firebase-admin";

// const nf = require('./notification-functions');

// add latest log in post to post document.
exports.lastLog = functions.firestore
  .document("posts/{postId}/logs/{log}")
  .onCreate((snap: any, context: any) => {
    const postId = context.params.postId;
    const docRef = admin.firestore().collection("posts").doc(postId);
    if (snap.data().type == 'created'
      || snap.data().type == 'answered'
      || snap.data().type == 'replied'
      || snap.data().type == 'voted') {
        return docRef.update({
          lastLog: snap.data(),
        });  
    } 
    return null;
  });
//when post/followers added update user/posts
exports.postFollowers = functions.firestore
  .document("posts/{postId}/followers/{follower}")
  .onCreate((snap: any, context: any) => {
    const postId = context.params.postId;
    const userRef = admin.firestore().collection("users").doc(snap.data().uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Yes");

        return userRef.set(
          {
            posts: {
              [postId]: true,
            },
          },
          { merge: true }
        );
      } else {
        console.log("User not found");
        return null;
      }
    });
  });
// to count answers number and last update time in post document
exports.postUpdate = functions.firestore
  .document("posts/{postId}")
  .onUpdate((change: any) => {
    decreaseTagNumber(change.before.data());
    increaseTagNumber(change.after.data());
  });
// count how many posts in post collection and save to ./metas
exports.postMeta = functions.firestore
  .document("posts/{postId}")
  .onWrite((change: any, context: any) => {
    const metaRef = admin.firestore().collection("metas").doc("post");
    const postRef = admin.firestore().collection("posts");
    if (change.before.exists && !change.after.exists) {
      console.log("delete method");
      decreaseTagNumber(change.before.data());
      updateUserPostNumber(change.before.data());
    }
    if (!change.before.exists && change.after.exists) {
      console.log("create method");
      increaseTagNumber(change.after.data());
      updateUserPostNumber(change.after.data());
    }

    return postRef
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot: any) => {
        const size = snapshot.size;
        const updatedAt = admin.firestore.FieldValue.serverTimestamp();
        const data = {
          size,
          updatedAt,
        };
        return metaRef.update(data);
      });
  });

function updateUserPostNumber(post: any): any {
  const userRef = admin.firestore().collection("users").doc(post.uid);
  return admin
    .firestore()
    .collection("posts")
    .where("uid", "==", post.uid)
    .get()
    .then((snapshot: any) => {
      return userRef.update({ postNumber: snapshot.size });
    })
    .catch((err) => {
      console.log(err);
    });
}

function decreaseTagNumber(post: any) {
  const decreasedBy = admin.firestore.FieldValue.increment(-1);
  const tagsRef = admin.firestore().collection("tags");
  if (post.tags.length) {
    post.tags.forEach((tag: any) => {
      tagsRef.doc(tag.id).update({
        totalUsed: decreasedBy,
      });
    });
  }
}

function increaseTagNumber(post: any) {
  const increasedBy = admin.firestore.FieldValue.increment(1);
  const tagsRef = admin.firestore().collection("tags");
  if (post.tags.length) {
    post.tags.forEach((item: any) => {
      tagsRef.doc(item.id).update({
        totalUsed: increasedBy,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });
  }
}
