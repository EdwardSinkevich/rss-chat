import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  messagesWrap: {
    position: 'absolute',
    top: '60px',
    bottom: '60px',
    left: '0',
    right: '0',
  },

  messages: {
    height: '100%',
    overflowY: 'auto',
    wordBreak: 'break-word',
  },

  userMessage: {
    textAlign: 'end',
  },
}));
    

const ChatMessages = ({ dataMessages, scrollTo, userName, messagesContainer }) => {
  const styles = useStyles();

  return (
    <div className={styles.messagesWrap}>
      <ul className={styles.messages} ref={messagesContainer}>
        {
          dataMessages.map(({from, time, id, message}) => {
            if (from === userName) {
              return (
                <li key={id} className={styles.userMessage}>
                  <span>{message}</span>
                </li>
              )
            } else return (
                <li key={id}>
                  <span>{message}</span>
                </li>
              )
          })
        }
        <div ref={scrollTo} />
      </ul>
    </div>
  );
}

export default ChatMessages;