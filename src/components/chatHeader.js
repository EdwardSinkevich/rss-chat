import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  chatHeader: {
    height: '60px',
    background: '#00bcd4',
  },
}));

const ChatHeader = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.chatHeader}>
      <button onClick={props.logOut}>LogOut</button>
    </div>
  );
}

export default ChatHeader;