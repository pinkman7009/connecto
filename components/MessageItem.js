import React from 'react';
import styles from '../styles/Messages.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';

const MessageItem = ({ name, message }) => {
  return (
    <div className={styles.messageitem}>
      <div className={styles.avatar}>
        <Icon icon={bxsUser} style={{ color: '#6e49ff', fontSize: '50px' }} />
      </div>
      <div className={styles.messageContent}>
        <h3>{name}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageItem;
