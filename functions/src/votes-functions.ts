const functions = require("firebase-functions");
// @ts-ignore
import * as admin from "firebase-admin";
// changing by batch to operation post/totalVotes, answer/votesNumber, user/votesReceived when vote added
// exports.voteAdded = functions.firestore
//   .document("votes/{voteId}")
//   .onCreate((snap: any, context: any) => {
//     const increaseBy = admin.firestore.FieldValue.increment(1);
//     const newValue = snap.data();
//     const batch = admin.firestore().batch();
//     batch.update(getPostRef(newValue.postId), { totalVotes: increaseBy });
//     newValue.type === "answer"
//       ? batch.update(getAnswerRef(newValue.postId, newValue.answerId), {
//           votesNumber: increaseBy,
//         })
//       : batch.update(getPostRef(newValue.postId), { votesNumber: increaseBy });
//     batch.update(getUserRef(newValue.voteReceiver), {
//       votesReceived: increaseBy,
//     });
//     return batch.commit().then(() => {
//       console.log("Vote added");
//     });
//   });
// changing by batch operation to post/totalVotes, answer/votesNumber, user/votesReceived when vote added
// exports.voteDeleted = functions.firestore
//   .document("votes/{voteId}")
//   .onDelete((snapshot: any) => {
//     const decreasedBy = admin.firestore.FieldValue.increment(-1);
//     const newValue = snapshot.data();
//     const batch = admin.firestore().batch();
//     batch.update(getPostRef(newValue.postId), { totalVotes: decreasedBy });
//     newValue.type === "answer"
//       ? batch.update(getAnswerRef(newValue.postId, newValue.answerId), {
//           votesNumber: decreasedBy,
//         })
//       : batch.update(getPostRef(newValue.postId), { votesNumber: decreasedBy });
//     batch.update(getUserRef(newValue.voteReceiver), {
//       votesReceived: decreasedBy,
//     });
//     batch.commit().then(() => {
//       console.log("Vote deleted");
//     });
//   });

exports.voteChanged = functions.firestore
  .document("upVotes/{itemId}")
  .onWrite((change: any, context: any) => {
    const document = change.after.exists ? change.afterData() : null;
    const increasedBy = admin.firestore.FieldValue.increment(
      getTotalVotes(document)
    );
    const batch = admin.firestore().batch();
    getUserRef(context.params.itemId).then((userRef) => {
      batch.update(userRef, { votesReceived: increasedBy });
      batch.update(getPostRef(context.params.itemId), {
        totalVotes: getTotalVotes(document),
      });
      return batch.commit().then(() => {
        console.log("votes updated");
      });
    });
  });
function getTotalVotes(voteDocument: any): any {
  return voteDocument
    ? Object.values(voteDocument).reduce((a: any, b: any) => a + b, 0)
    : 0;
}
function getPostRef(itemId: string) {
  const idArray = itemId.split("_");
  return admin.firestore().collection("posts").doc(idArray[0]);
}
async function getUserRef(itemId: string) {
  const idArray = itemId.split("_");
  const itemRef =
    idArray.length > 1
      ? admin
          .firestore()
          .collection("posts")
          .doc(idArray[0])
          .collection("answers")
          .doc(idArray[1])
      : admin.firestore().collection("posts").doc(idArray[0]);
  const snapshot = await itemRef.get();
  const data = snapshot.data();
  return admin.firestore().collection("users").doc(data?.author.uid);
}
// function getAnswerRef(postId: string, answerId: string) {
//   return admin
//     .firestore()
//     .collection("posts")
//     .doc(postId)
//     .collection("answers")
//     .doc(answerId);
// }
