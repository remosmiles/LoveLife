importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBcympyQoY6K72wI-jhubAef34JbS8J-QA",
    authDomain: "lovelife-9f019.firebaseapp.com",
    projectId: "lovelife-9f019",
    storageBucket: "lovelife-9f019.firebasestorage.app",
    messagingSenderId: "69566619232",
    appId: "1:69566619232:web:c30c1e30efc35aeb07ed05"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
