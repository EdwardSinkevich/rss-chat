import React from 'react';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  time: {
    fontSize: '12px',
    color: '#919191',
    alignSelf: 'flex-end',
  },
}));

const MessageTimeReceipt = ({ time, className }) => {
  const styles = useStyles();
  const date = moment(new Date(time)).calendar();

  return (
    <span className={ className ? `${styles.time} ${className}` : styles.time }>{date}</span>
  );
}

export default MessageTimeReceipt;