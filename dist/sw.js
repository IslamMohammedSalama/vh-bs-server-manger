// sw.js

const CACHE_NAME = "vh-srv-manger-cache-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/css/style.min.css",
	"/css/maps/style.min.css.map",
	"/js/script.min.js",
	"/js/maps/script.min.js.map",
	// Add other static assets you want to cache
	"/assets/imgs/favicon.ico",
	"/assets/json/config.json",
	"/webfonts/fa-brands-400.ttf",
	"/webfonts/fa-brands-400.woff2",
	"/webfonts/fa-regular-400.ttf",
	"/webfonts/fa-regular-400.woff2",
	"/webfonts/fa-solid-900.ttf",
	"/webfonts/fa-solid-900.woff2",
	"/webfonts/fa-v4compatibility.ttf",
	"/webfonts/fa-v4compatibility.woff2",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				console.log("Opened cache");
				return cache.addAll(urlsToCache);
			})
			.catch((error) => {
				console.error("Cache addAll failed during install:", error);
				// IMPORTANT: If addAll fails, the service worker won't install correctly.
				// Ensure all URLs in urlsToCache are correct and accessible.
			})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => {
				if (response) {
					console.log("Serving from cache:", event.request.url);
					return response;
				}
				console.log("Fetching from network:", event.request.url);
				// Attempt to fetch from the network
				return fetch(event.request).catch((error) => {
					// *** THIS IS THE IMPORTANT PART FOR DEBUGGING "Failed to fetch" ***
					console.error("Network fetch failed for:", event.request.url, error);
					// Here, you could return a fallback response, e.g., an offline page.
					// For now, re-throwing helps ensure the error propagates and is visible.
					throw error;
				});
			})
			.catch((error) => {
				// This catches any errors from caches.match or errors re-thrown from the fetch.catch
				console.error("Error in respondWith for:", event.request.url, error);
				// Optionally, return an offline fallback for ALL fetch failures
				return new Response(
					"<h1>Offline</h1><p>Looks like you're offline or the content isn't available.</p>",
					{
						headers: { "Content-Type": "text/html" },
					}
				);
			})
	);
});

self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
