const CACHE_NAME = "vane-payraw-dictionary-v16.6";

// لێرەدا ناوی فۆڵدەرەکەی گیت هاب (Repository) زیاد دەکەین بۆ ئەوەی فایلەکان بە دروستی بدۆزێتەوە
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// دامەزراندنی کەش و پاشەکەوتکردنی فایلەکان
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // ناچارکردنی وێبگەر بۆ بەکارهێنانی وەشانی نوێ
  );
});

// سڕینەوەی کەشە کۆنەکان کاتێک وەشانەکە نوێ دەبێتەوە
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// خوێندنەوە لە کەشەوە کاتێک هێڵی ئینتەرنێت نییە
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
