import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chat from './chat.js';
import LogInWindow from '../components/logInWindow';
import { logIn } from '../actions';

const mapDispatchToProps = dispatch => ({
  logIn: (userName) => dispatch(logIn(userName)),
});

class App extends Component {
  state = {
    inputName: localStorage.getItem('userName') || '',
  }

  componentDidMount() {
    this.logIn();
    Notification.requestPermission();
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

  handleInputName = (e) => {
    this.setState({
      inputName: e.target.value,
    })
  }

  render() {
    const { inputName } = this.state;
    const { userName } = this.props;
    const isExistName = userName ? false : true;

    return (
      <>
        <main>
          <Chat />
        </main>
        <LogInWindow 
          onChange={this.handleInputName} 
          value={inputName}
          logIn={this.logIn}
          open={isExistName}
          handleClose={this.state.handleClose}
          />
      </>
    );
  }
}

export default connect(state => ({
  userName: state.userSession,
}), mapDispatchToProps)(App);
