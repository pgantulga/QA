importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyB_U9xUKv8SCAFH33XWQCQTCBUr2BXMpX0",
    authDomain: "qaproject-23417.firebaseapp.com",
    databaseURL: "https://qaproject-23417.firebaseio.com",
    projectId: "qaproject-23417",
    storageBucket: "qaproject-23417.appspot.com",
    messagingSenderId: "115294037575",
    appId: "1:115294037575:web:10f20828dbd0fa997f7362"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
