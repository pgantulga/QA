"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const admin = require("firebase-admin");
admin.initializeApp();
const postFunctions = require('./post-functions');
exports.lastLog = postFunctions.lastLog;
exports.postUpdate = postFunctions.postUpdate;
exports.postMeta = postFunctions.postMeta;
const commentFunctions = require('./comments-functions');
exports.aggregateComments = commentFunctions.aggregateComments;
exports.repliesUpdate = commentFunctions.repliesUpdate;
const votesFunctions = require('./votes-functions');
exports.voteAdded = votesFunctions.voteAdded;
exports.voteDeleted = votesFunctions.voteDeleted;
const tagFunctions = require('./tags-functions');
exports.tagChanged = tagFunctions.tagChanged;
exports.tagCreated = tagFunctions.tagCreated;
const notificationFunctions = require('./notification-functions');
exports.notificationCreated = notificationFunctions.notificationCreated;
const userFunctions = require('./user-functions');
exports.userCreated = userFunctions.userCreated;
exports.userChanged = userFunctions.userChanged;
//# sourceMappingURL=index.js.map