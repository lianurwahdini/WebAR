const cacheName = "DefaultCompany-MyWebAR-0.1";
const contentToCache = [
    "Build/d733658702c1c7c3d48f0fd5de9cd592.loader.js",
    "Build/5ae81e71dfe426b7e69c615151ce08a9.framework.js",
    "Build/a0800e740bdb74bb44f5fa32f287d4f1.data",
    "Build/5e6f3af622fb5071e0bfa1841aa08feb.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
