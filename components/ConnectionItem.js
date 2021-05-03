import React from 'react';
import styles from '../styles/Connections.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';

const ConnectionItem = ({ name }) => {
  return (
    <div className={styles.connectioncard}>
      <div className={styles.avatar}>
        <Icon icon={bxsUser} style={{ color: '#6e49ff', fontSize: '80px' }} />
      </div>
      {name}
    </div>
  );
};

export default ConnectionItem;
