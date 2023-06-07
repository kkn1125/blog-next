self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");
});

// 서비스 워커 활성화
self.addEventListener("activate", (event) => {
  console.log("sw active");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener("message", (e) => {
  e.waitUtil(function () {
    console.log(234);
  });
});

self.addEventListener("notificationclick", (e) => {
  console.log(e);
});
