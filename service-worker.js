const CACHE_NAME = "victohm-calculator-v1";
const urlsToCache = [
  "/calculator-app/",
  "/calculator-app/index.html",
  "/calculator-app/manifest.json",
  "/calculator-app/logo.png",
  "/calculator-app/style.css",
  "/calculator-app/script.js"
];

// Install and cache everything
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Optional: clear old cache on update
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
});
