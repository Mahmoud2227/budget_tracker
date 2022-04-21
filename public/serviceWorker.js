const CACHE_NAME = "version-1";
const urlsToCache = ["index.html"];

const self = this;

// install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.target).then(async () => {
      try {
        return await fetch(event.request);
      } catch {
        return await caches.match("index.html");
      }
    })
  );
});

// Active the service worker
self.addEventListener("active", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.forEach((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            caches.delete(cacheName);
          }
        })
      )
    )
  );
});
