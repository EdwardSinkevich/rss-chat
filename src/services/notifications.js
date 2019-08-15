const spawnNotification = (body, title) => {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, {
          body: body,
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          icon: '/assets/images/rss.png',
        });
      });
    }
  });
}

export default spawnNotification;