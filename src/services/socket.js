const setUpSocket = (receiveMessage, onReconnect) => {
  let socket;

  const connectSocket = () => {
    socket = new WebSocket('wss://wssproxy.herokuapp.com/');

    socket.onopen = () => {
      onReconnect(socket);
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data).reverse();
      receiveMessage(data);
    }

    socket.onclose = () => {
      setTimeout(() => {
        connectSocket();
      }, 4000);
    };
  }

  connectSocket();

  return socket;
}

export default setUpSocket;