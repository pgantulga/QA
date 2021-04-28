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
    const updatedDocument = change.after.exists ? change.after.data() : null;
    const increasedBy = admin.firestore.FieldValue.increment(
      getVoteDiff(updatedDocument, change.before.data())
    );
    console.log(increasedBy);
    const refArray = context.params.itemId.split("_");
    const batch = admin.firestore().batch();
    getUserRef(context.params.itemId).then((userRef) => {
      batch.update(userRef, { votesReceived: increasedBy });
      if (refArray.length == 1) {
        batch.update(getPostRef(context.params.itemId), {
          totalVotes: getDocumentTotalVotes(updatedDocument),
        });
      }
      return batch.commit().then(() => {
        console.log("votes updated");
      });
    });
  });
function getVoteDiff(updatedDocument: any, oldDocument: any): any {
  const updatedTotal: any = updatedDocument
    ? Object.values(updatedDocument).reduce(reducer, 0)
    : 0;
  const oldTotal: any = oldDocument
    ? Object.values(oldDocument).reduce(reducer, 0)
    : 0
    const diff = updatedTotal - oldTotal;
  return diff;
}
function getDocumentTotalVotes(updatedDocument: any): any {
  const updatedTotal: any = updatedDocument
  ? Object.values(updatedDocument).reduce(reducer, 0)
  : 0;
  return updatedTotal;
}

const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue
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
  console.log(data?.author.uid);
  return admin.firestore().collection("users").doc(data?.author.uid);
}
// function getAnswerRef(postId: string, answerId: string) {
//   return admin
//     .firestore()
//     .collection("posts")
//     .doc(postId)
//     .collection("answers")
//     .doc(answerId);
