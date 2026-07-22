// firebase-messaging-sw.js — dùng cho app Việc Cần Làm
// Đặt file này CÙNG THƯ MỤC với viec-can-lam.html trên GitHub Pages.

importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAL4TaYl8KiktkNkburY94jsxSjyyGh2xc",
  authDomain: "so-thu-chi-9f0b5.firebaseapp.com",
  projectId: "so-thu-chi-9f0b5",
  storageBucket: "so-thu-chi-9f0b5.firebasestorage.app",
  messagingSenderId: "900824130297",
  appId: "1:900824130297:web:27cff5c2f775cf2bd93828"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Việc Cần Làm";
  const options = {
    body: payload.notification?.body || "",
    icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:'window'}).then(list=>{
      for(const c of list){ if('focus' in c) return c.focus(); }
      if(clients.openWindow) return clients.openWindow('./');
    })
  );
});
