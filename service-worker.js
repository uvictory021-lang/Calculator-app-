self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('victohm-cache').then((cache) => {
      return cache.addAll([
        '/calculator-app/',
        '/calculator-app/index.html',
        '/calculator-app/manifest.json',
        '/calculator-app/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
