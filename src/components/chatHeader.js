import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  chatHeader: {
    height: '60px',
    background: '#f0f8ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userNameWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#01BFA5',
    borderRadius: '5px',
    marginLeft: '20px',
    padding: '3px 6px',
    fontSize: '14px',
  },

  userNameLable: {
    color: '#3d3d3d'
  },

  userName: {
    color:'#FFFFFF',
  },

  logOutBtn: {
    background: '#01BFA5',
    color: 'white',
    marginRight: '20px',
    padding: '4px 8px',
  },
}));

const ChatHeader = ({logOut, userName}) => {
  const styles = useStyles();
  if (userName) {
    return (
      <div className={styles.chatHeader}>
        <div className={styles.userNameWrap}>
          <span className={styles.userNameLable}>
            Your name:
          </span>
          <span className={styles.userName}>
            {userName}
          </span>
        </div>
        <Button variant="contained" onClick={logOut} className={styles.logOutBtn}>LogOut</Button>
      </div>
    );
  }
  return <div className={styles.chatHeader} />
}

export default ChatHeader;