importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyA-89-et_QLVbXW-C7xlUBznS6nBpFVLMY",
  authDomain: "webpushsample-46958.firebaseapp.com",
  databaseURL: "https://webpushsample-46958.firebaseio.com",
  projectId: "webpushsample-46958",
  storageBucket: "webpushsample-46958.appspot.com",
  messagingSenderId: "673533747681"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/itwonders-web-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});