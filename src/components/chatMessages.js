import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  messagesWrap: {
    position: 'absolute',
    top: '60px',
    bottom: '60px',
    left: '0',
    right: '0',
    background: '#FFFFFF',
  },

  messagesList: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    wordBreak: 'break-word',
  },

  messageWrap:{
    display: 'flex',
    flexDirection: 'column',
  },

  message: {
    animationDuration: '0.45s',
    transitionTimingFunction: 'cubic-bezier(0.4, -0.04, 1, 1)',
    animationName: '$slideFromLeft',
  },

  messagesRight: {
    display: 'flex',
    flexDirection: 'row-reverse',
    animationName: '$slideFromRight',
  },

  textBubble: {
		display: 'inline-block',
    hyphens: 'auto',
    padding: '7px 14px',
    position: 'relative',
    maxWidth: '70%',
    background: '#F2F2F2',
    letterSpacing: '0.4px',
    margin: '5px 20px',
    borderRadius: '0.5em',
		'&:after': {
			content: '""',
			position: 'absolute',
			left: '0',
			top: '50%',
			width: '0',
			height: '0',
			border: '12px solid transparent',
			borderRightColor: '#F2F2F2',
			borderLeft: '0',
			marginTop: ' -6px',
			marginLeft: '-11px',
			borderTop: '0'
    },
  },

  textBubbleRight: {
    display: 'flex',
    flexDirection: 'column',
    background: '#01BFA5',
    '&:after': {
      left: 'auto',
      content: '""',
      position: 'absolute',
      right: '0',
      top: '50%',
      width: '0',
      height: '0',
      border: '12px solid transparent',
      borderLeftColor: '#01BFA5',
      borderRight: '0',
      marginTop: ' -6px',
      marginRight: '-11px',
      borderTop: '0'
    },
  },

  nickName: {
    fontSize: '12px',
    color: '#01BFA5',
  },

  time: {
    fontSize: '12px',
    marginLeft: '20px',
    color: '#919191',
    alignSelf: 'flex-end',
  },

  timeRight: {
    color: '#FFFFFF',
  },

  scrollElement: {
    marginBottom: '15px',
  },

  
  '@keyframes slideFromLeft': {
    '0%': {
      transform: 'translateX(-100%)',
      opacity: '0',
    },

    '100%': {
      transform: 'translateX(0)',
      opacity: '1',
    },
  },

  '@keyframes slideFromRight': {
    '0%': {
      transform: 'translateX(100%)',
      opacity: '0',
    },

    '100%': {
      transform: 'translateX(0)',
      opacity: '1',
    },
  },
}));
    

const ChatMessages = ({ dataMessages, scrollTo, userName, messagesContainer }) => {
  const styles = useStyles();

  return (
    <div className={styles.messagesWrap}>
      <ul className={styles.messagesList} ref={messagesContainer}>
        {
          dataMessages.map(({from, time, id, message}) => {
            const date = moment(new Date(time)).calendar();
            if (from === userName) {
              return (
                <li key={id} className={`${styles.message} ${styles.messagesRight}`}>
                  <div className={`${styles.textBubble} ${styles.textBubbleRight}`}>
                    {message}
                    <span className={`${styles.time} ${styles.timeRight}`}>{date}</span>
                  </div>
                </li>
              )
            } else return (
                <li key={id} className={styles.message}>
                  <div className={styles.textBubble}>
                    <p className={styles.nickName}>{from}</p>
                    {message}
                    <span className={styles.time}>{date}</span>
                  </div>
                </li>
              )
          })
        }
        <div className={styles.scrollElement} ref={scrollTo} />
      </ul>
    </div>
  );
}

export default memo(ChatMessages);