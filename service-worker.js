const cache_name = "firstpwa-v00023";
var urlsToCache = [
    "/",
    "/icon.png",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/gallery.html",
    "/pages/contact.html",
    "/pages/about.html",
    "/img/img1.jpg",
    "/img/img2.jpg",
    "/img/img3.jpg",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: cache_name })
        .then(function(response) {
            if (response) {
                console.log("Service Worker: Gunakan aset dari Cache: ", response.url);
                return response;
            }

            console.log("Service Worker: Memuat aset dari server: ",
            event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil (
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != cache_name) {
                        console.log("ServiceWorker: cache" + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});