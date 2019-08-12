const setUpSocket = (receiveMessage) => {
  let socket;

  const connectSocket = () => {
    socket = new WebSocket('wss://wssproxy.herokuapp.com/');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data).reverse();
      receiveMessage(data);
    }

    socket.onclose = () => {
      connectSocket();
    };
  }

  connectSocket();

  return socket;
}

export default setUpSocket;