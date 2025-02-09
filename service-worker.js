const CACHE_NAME = "todo-pwa-cache-v2";
const ASSETS = [
    "/",
    "index.html",
    "styles.css",
    "app.js",
    "manifest.json",
    "icon.png"
];

// Install event - cache necessary files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch event - serve from cache if offline, else fetch from network
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // If the resource is found in cache, return it
            if (response) {
                return response;
            }

            // If not in cache, fetch it from the network
            return fetch(event.request)
                .then(networkResponse => {
                    // Cache the new resource for future use
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                });
        })
    );
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

