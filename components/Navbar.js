import React from 'react';
import styles from '../styles/Navbar.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import bxMessageRounded from '@iconify/icons-bx/bx-message-rounded';
import usersSolid from '@iconify/icons-clarity/users-solid';
import bxsUser from '@iconify/icons-bx/bxs-user';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>Connecto</h2>
      <input
        type='text'
        placeholder='search users,colleges,events,groups'
        className={styles.search}
      />

      <div className={styles.icons}>
        <Icon
          icon={bxMessageRounded}
          style={{ color: '#6e49ff', fontSize: '42px' }}
        />
        <Icon
          icon={usersSolid}
          style={{ color: '#6e49ff', fontSize: '42px' }}
        />
      </div>

      <div className={styles.profile}>
        <Icon icon={bxsUser} style={{ color: '#6e49ff', fontSize: '42px' }} />
        <p>Soumik Chaudhuri</p>
      </div>
    </nav>
  );
};

export default Navbar;
