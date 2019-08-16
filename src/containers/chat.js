import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/styles';
import ChatHeader from '../components/chatHeader';
import ChatMessages from '../components/chatMessages';
import ChatControls from '../components/chatControls';
import { logOut, changeVisibility, cacheMessage } from '../actions';

import Notifications from '../services/notifications';


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

  '@media (max-width: 780px)': {
    chatRoot: {
      top: '0',
      width: '100%',
      height: '100%',
      borderRadius: '0',
    },
  },
});

const mapStateToProps = (state) => {
  const {
    messages, userSession, documentVisibility, offlineMessages,
  } = state;
  return {
    dataMessages: messages,
    userName: userSession,
    isHidden: documentVisibility,
    cachedMessages: offlineMessages,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
  changeVisibility: () => dispatch(changeVisibility()),
  cacheMessage: (userName, message) => dispatch(cacheMessage(userName, message)),
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
    const { changeVisibility } = this.props;

    window.addEventListener('visibilitychange', () => changeVisibility());
  }

  handleInputMessage = (e) => {
    this.setState({
      inputMessage: e.target.value,
    });
  };

  logOut = () => {
    const { logOut } = this.props;
    logOut();
  };

  sendMessage = () => {
    const { inputMessage } = this.state;
    const { socket, userName, cacheMessage } = this.props;

    if (!userName || !inputMessage) {
      return;
    }

    if (socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          from: userName,
          message: inputMessage,
        }),
      );
    } else {
      cacheMessage(userName, inputMessage);
    }

    this.setState({
      inputMessage: '',
    });
  };

  sendMessageOnKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sendMessage();
    }
  };

  scrollToBottom = () => {
    const { wasFirstScroll, inputMessage } = this.state;
    const { dataMessages, userName } = this.props;
    const lastMessage = dataMessages[dataMessages.length - 1];
    const { scrollHeight } = this.messagesContainer.current;
    const { scrollTop } = this.messagesContainer.current;
    const messagesContainerHeight = this.messagesContainer.current.offsetHeight;
    const minimalScrollDistance = 100;
    const checkIfCanScroll = (lastMessage && lastMessage.from === userName && !inputMessage)
      || scrollHeight - scrollTop - messagesContainerHeight
        < minimalScrollDistance;

    if (dataMessages.length && !wasFirstScroll) {
      this.setState({ wasFirstScroll: true });
      this.scrollToElement.current.scrollIntoView();
    } else if (checkIfCanScroll) {
      this.scrollToElement.current.scrollIntoView();
    }
  };

  notify = (oldMessages) => {
    const { isHidden, dataMessages } = this.props;
    const lastMessage = dataMessages[dataMessages.length - 1];

    if (isHidden && oldMessages.length !== dataMessages.length) {
      Notifications.spawnNotification(
        `message: ${lastMessage.message}`,
        `From: ${lastMessage.from}`,
      );
    }
  };

  componentDidUpdate(prevProps) {
    this.scrollToBottom();

    this.notify(prevProps.dataMessages);
  }

  render() {
    const { inputMessage } = this.state;
    const {
      dataMessages, classes, userName, cachedMessages,
    } = this.props;

    return (
      <div className={classes.chatRoot}>
        <ChatHeader logOut={this.logOut} userName={userName} />
        <ChatMessages
          dataMessages={dataMessages}
          scrollTo={this.scrollToElement}
          userName={userName}
          messagesContainer={this.messagesContainer}
          cachedMessages={cachedMessages}
        />
        <ChatControls
          onChange={this.handleInputMessage}
          value={inputMessage}
          sendMessage={this.sendMessage}
          sendMessageOnKey={this.sendMessageOnKey}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Chat));
