if (workbox) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
    );
  });

  workbox.precaching.precacheAndRoute(self.__precacheManifest);
}
