const CACHE_NAME = "version-1"
const urlsToCache = ["index.html", "offline.html"]

// @ts-ignore
const self = this

// Install SW
self.addEventListener("install", (event) => {
  // @ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")

      return cache.addAll(urlsToCache)
    })
  )
})

// Listen for requests
self.addEventListener("fetch", (event) => {
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    caches.match(event.request).then(() => {
      // @ts-ignore
      return fetch(event.request).catch(() => caches.match("offline.html"))
    })
  )
})

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = []
  cacheWhitelist.push(CACHE_NAME)

  // @ts-ignore
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})
