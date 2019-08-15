import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  chatHeader: {
    height: '60px',
    background: '#f0f8ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  logOutBtn: {
    background: '#01BFA5',
    color: 'white',
    marginRight: '20px',
    padding: '4px 8px',
  },
}));

const ChatHeader = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.chatHeader}>
      <Button variant="contained" onClick={props.logOut} className={styles.logOutBtn}>LogOut</Button>
    </div>
  );
}

export default ChatHeader;