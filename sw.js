const CACHE_NAME = 'methodius-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network-first for the page shell itself (ensures deploys are visible
  // immediately without needing a manual CACHE_NAME bump), falling back to
  // the cached copy only when offline.
  if (event.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedRes = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedRes));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Network-first for catalog metadata (ensures immediate visibility of new track uploads)
  if (url.pathname.endsWith('catalog.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedRes = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedRes));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Bypass cache for remote audio files to prevent browser storage quota crashes
  if (url.pathname.endsWith('.mp3') || url.pathname.endsWith('.zip')) {
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});