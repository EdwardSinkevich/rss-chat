import React, { Component } from 'react';
import { connect } from 'react-redux';

import setUpSocket from '../services/socket';
import Chat from './chat.js';
import LogInWindow from '../components/logInWindow';
import { receiveMessage, logIn, clearCacheMessage } from '../actions';

const mapStateToProps = (state) => {
  const { userSession, offlineMessages } = state;
  return {
    userName: userSession,
    cachedMessages: offlineMessages,
  }
}

const mapDispatchToProps = dispatch => ({
  receiveMessage: data => dispatch(receiveMessage(data)),
  logIn: (userName) => dispatch(logIn(userName)),
  clearCacheMessage: () => dispatch(clearCacheMessage()),
});

class App extends Component {
  state = {
    inputName: localStorage.getItem('userName') || '',
  }

  setUpSocket() {
    const { receiveMessage } = this.props;
    this.socket = setUpSocket(receiveMessage, this.sendCachedMessages);
  }

  componentDidMount() {
    this.setUpSocket();
    this.logIn();

    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }

  logIn = () => {
    const { logIn } = this.props;
    const { inputName } = this.state;

    if (inputName) {
      logIn(inputName);

      this.setState({
        inputName: '',
      })
    }
  }

  logInOnKey = (e) => {
    if(e.key === 'Enter') { 
      e.preventDefault();
      this.logIn();
    }
  }

  handleInputName = (e) => {
    this.setState({
      inputName: e.target.value,
    })
  }

  sendCachedMessages = () => {
    const { cachedMessages, clearCacheMessage } = this.props;

    if (this.socket.readyState === 1) {
      cachedMessages.forEach(element => {
        this.socket.send(JSON.stringify({
          from: element.fromUser,
          message: element.message,
        }));
      });
      clearCacheMessage();
    }
  }

  render() {
    const { inputName } = this.state;
    const { userName } = this.props;
    const isExistName = userName ? false : true;

    return (
      <>
        <main>
          <Chat socket={this.socket} />
        </main>
        <LogInWindow 
          onChange={this.handleInputName} 
          value={inputName}
          logIn={this.logIn}
          open={isExistName}
          handleClose={this.state.handleClose}
          logInOnKey={this.logInOnKey}
          />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
