import React from 'react';
import { makeStyles } from '@material-ui/core';
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles(() => ({
  chatControls: {
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    height: '60px',
    background: '#f0f8ff',
    display: 'flex',
    justifyContent: 'center',
  },

  inputAreaWrap: {
    width: '50%',
    margin: '7px 0',
    background: 'white',
    padding: '5px 0px 5px 20px',
    border: '1px solid #858585',
    borderRight: '0',
    borderBottomLeftRadius: '30px',
    borderTopLeftRadius: '30px',
  },

  inputArea: {
    fontFamily: 'inherit',
    lineHeight: '30px',
    resize: 'none',
    width: '100%',
    height: '100%',
    fontSize: '15px',
    overflowY: 'auto',
  },

  sendBtn: {
    color: '#3d3d3d',
    cursor: 'pointer',
    userSelect: 'none',
    width: '60px',
    border: '1px solid #858585',
    borderBottomRightRadius: '30px',
    borderTopRightRadius: '30px',
    margin: '7px 0',
    background: '#01BFA5',
    '&:hover': {
      background: 'rgba(1, 191, 166, 0.7)',
      transition: 'background 0s, color 0.135s',
    },
  },
}));

const ChatControls = ({
  value, onChange, sendMessage, sendMessageOnKey,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.chatControls}>
      <div className={styles.inputAreaWrap}>
        <textarea
          className={styles.inputArea}
          onChange={onChange}
          value={value}
          onKeyPress={sendMessageOnKey}
          placeholder="Write message"
          autoComplete="off"
        />
      </div>
      <button className={styles.sendBtn} onClick={sendMessage}>
        <Send fontSize="large" />
      </button>
    </div>
  );
};

export default ChatControls;
