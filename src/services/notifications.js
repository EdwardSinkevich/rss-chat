const spawnNotification = (body, title) => {
  if ('Notification' in window) {
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, {
            body: body,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
          });
        });
      }
    });
  }
}

export default spawnNotification;