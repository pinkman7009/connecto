import React, { useContext } from 'react';
import styles from '../styles/Navbar.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import bxMessageRounded from '@iconify/icons-bx/bx-message-rounded';
import usersSolid from '@iconify/icons-clarity/users-solid';
import bxsUser from '@iconify/icons-bx/bxs-user';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchBar from './SearchBar';

import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

const Navbar = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  const signOutHandler = () => {
    firebase.auth().signOut();
    router.push('/');
  };
  return (
    <nav className={styles.navbar}>
      <Link href='/home'>
        <h2 className={styles.title}>Connecto</h2>
      </Link>
      <SearchBar />
      <div className={styles.icons}>
        <Link href='/messages'>
          <Icon
            icon={bxMessageRounded}
            style={{ color: '#6e49ff', fontSize: '42px' }}
          />
        </Link>
        <Link href='/connections'>
          <Icon
            icon={usersSolid}
            style={{ color: '#6e49ff', fontSize: '42px' }}
          />
        </Link>
      </div>

      {user && (
        <Link href='/profile/[id]' as={`/profile/${user.uid}`}>
          <div className={styles.profile}>
            <Icon
              icon={bxsUser}
              style={{ color: '#6e49ff', fontSize: '42px' }}
            />
            <p>{user.displayName}</p>
          </div>
        </Link>
      )}
      <button className={styles.btn1} type='button' onClick={signOutHandler}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
