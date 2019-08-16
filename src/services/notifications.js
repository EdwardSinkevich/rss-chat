export default class Notifications {
  static requestNotificationsPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  static spawnNotification = (body, title) => {
    if ('Notification' in window) {
      Notification.requestPermission((result) => {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              body,
              vibrate: [200, 100, 200, 100, 200, 100, 200],
            });
          });
        }
      });
    }
  };
}
