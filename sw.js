const CACHE = 'fitna-v1-20261019-2';
const FILES = ['./', './index.html', './styles.css', './questions.js', './app.js', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './icon.svg'];
const NETWORK_FIRST = /(?:index\.html|styles\.css|questions\.js|app\.js|manifest\.webmanifest)(?:\?.*)?$/;
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => (key.startsWith('deep-') || key.startsWith('fitna-')) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const requestUrl = new URL(event.request.url);
  const networkFirst = NETWORK_FIRST.test(requestUrl.pathname.split('/').pop() + requestUrl.search) || requestUrl.pathname.endsWith('/Deep/');
  if (networkFirst) {
    event.respondWith(fetch(event.request).then(response => {
      if (response && response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
