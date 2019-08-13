const spawnNotification = (body, title) => {
  navigator.serviceWorker.ready.then(function(registration) {
    registration.showNotification(title, {
      body: body,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
    });
  });
}

export default spawnNotification;