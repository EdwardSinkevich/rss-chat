import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatHeader from '../components/chatHeader';
import ChatMessages from '../components/chatMessages';
import ChatControls from '../components/chatControls';
import { receiveMessage, logOut, changeVisibility } from '../actions';
import setUpSocket from '../services/socket';
import notifications from '../services/notifications';

import { withStyles } from '@material-ui/styles';

const styles = () => ({
  chatRoot: {
    position: 'absolute',
    right: '0',
    left: '0',
    bottom: '0',
    margin: '0 auto',
    maxWidth: '1000px',
    overflow: 'hidden',
    width: '90%',
    height: '85%',
    top: '7%',
    borderRadius: '9px',
    boxShadow: '0 0 60px rgba(0,0,0,0.5)',
  },
});

const mapStateToProps = (state) => {
  const { messages, userSession, documentVisibility} = state;
  return { 
    dataMessages: messages,
    userName: userSession,
    isHidden: documentVisibility,
  }
}

const mapDispatchToProps = dispatch => ({
  receiveMessage: (data) => dispatch(receiveMessage(data)),
  logOut: () => dispatch(logOut()),
  changeVisibility: () => dispatch(changeVisibility()),
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputMessage: '',
      wasFirstScroll: false,
    };

    this.scrollToElement = React.createRef();
    this.messagesContainer = React.createRef();
  }


  componentDidMount() {
    const { receiveMessage, changeVisibility } = this.props;
    this.socket = setUpSocket(receiveMessage);

    window.addEventListener("visibilitychange", () => changeVisibility());
  }

  handleInputMessage = (e) => {
    this.setState({
      inputMessage: e.target.value,
    })
  }

  logOut = () => {
    const { logOut } = this.props;
    logOut();
  }

  sendMessage = () => {
    const { inputMessage } = this.state;
    const { userName, receiveMessage } = this.props;
    
    if (!userName) {
      return;
    }
    
    if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify({
        from: userName,
        message: inputMessage,
      }));
  
      this.setState({
        inputMessage: '',
      })
    } else if (this.socket.readyState === 3) {
        this.socket = setUpSocket(receiveMessage);
    }
  }

  sendMessageOnKey = (e) => {
    if(e.key === 'Enter') {
      this.sendMessage();
    }
  }

  scrollToBottom = () => {
    const { wasFirstScroll, inputMessage } = this.state;
    const { dataMessages, userName } = this.props;
    const lastMessage = dataMessages[dataMessages.length - 1];
    const scrollHeight = this.messagesContainer.current.scrollHeight;
    const scrollTop = this.messagesContainer.current.scrollTop;
    const messagesContainerHeight = this.messagesContainer.current.offsetHeight;
    const minimalScrollDistance = 100;
    const checkIfCanScroll = (lastMessage && lastMessage.from === userName && !inputMessage)
    || (scrollHeight - scrollTop - messagesContainerHeight < minimalScrollDistance);

    if (dataMessages.length && !wasFirstScroll) {
      this.setState({wasFirstScroll: true});
      this.scrollToElement.current.scrollIntoView();
    } else if (checkIfCanScroll) {
      this.scrollToElement.current.scrollIntoView();
    }
  }

  notify = (prevProps) => {
    const { isHidden, dataMessages } = this.props;
    const lastMessage = dataMessages[dataMessages.length - 1];

    if (isHidden && prevProps.dataMessages.length !== dataMessages.length) {
      notifications(`message: ${lastMessage.message}`, `From: ${lastMessage.from}`);
    }
  }

  componentDidUpdate(prevProps) {
    this.scrollToBottom();

    this.notify(prevProps);
  }

  render() {
    const { inputMessage } = this.state;
    const { dataMessages, classes, userName } = this.props;

    return (
      <>
        <div className={classes.chatRoot}>
          <ChatHeader logOut={this.logOut} />
          <ChatMessages
            dataMessages={dataMessages}
            scrollTo={this.scrollToElement}
            userName={userName}
            messagesContainer={this.messagesContainer}
          />
          <ChatControls
            onChange={this.handleInputMessage}
            value={inputMessage}
            sendMessage={this.sendMessage}
            sendMessageOnKey={this.sendMessageOnKey}
          />
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));