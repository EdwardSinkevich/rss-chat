import React from 'react';
import { makeStyles } from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(() => ({
  errorIcon: {
    color: '#ff0000',
    marginRight: '20px',
  },
}));

const CachedMessages = ({
  cachedMessages,
  stylesMessage,
  stylesTextBubble,
}) => {
  const styles = useStyles();

  return (
    <>
      {cachedMessages.map(({ message }, index) => (
        <li key={index} className={stylesMessage}>
          <div className={`${stylesTextBubble}`}>
            <ErrorOutline className={styles.errorIcon} />
            {message}
          </div>
        </li>
      ))}
    </>
  );
};

export default CachedMessages;
