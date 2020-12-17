// @ts-ignore
import * as functions from 'firebase-functions';
// @ts-ignore
import * as admin from 'firebase-admin';

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


