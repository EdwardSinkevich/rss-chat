import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  chatControls: {
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    height: '60px',
    background: 'rebeccapurple',
    },
}));

const ChatControls = ({value, onChange, sendMessage, sendMessageOnKey }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.chatControls}>
      <input onChange={onChange} value={value} onKeyPress={sendMessageOnKey}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatControls;