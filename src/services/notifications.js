const spawnNotification = (body, title) => {
  const options = {
      body: body,
  };
  const notification = new Notification(title, options);
  setTimeout(notification.close.bind(notification), 4000);
}

export default spawnNotification;