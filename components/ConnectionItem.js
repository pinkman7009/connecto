import React, { useState, useEffect } from 'react';
import styles from '../styles/Connections.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';
import bxMessageRounded from '@iconify/icons-bx/bx-message-rounded';
import { getUserById } from '../services/firebase';

import Link from 'next/link';

const ConnectionItem = ({ id, viewProfile, startChatting }) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfileData = async (id) => {
      const [response] = await getUserById(id);

      setUserProfile(response);
    };
    if (id !== null && id !== undefined) fetchUserProfileData(id);
  }, []);
  return (
    <div className={styles.connectioncard}>
      <div className={styles.avatar}>
        <Icon icon={bxsUser} style={{ color: '#6e49ff', fontSize: '80px' }} />
      </div>
      {userProfile.fullName}
      {viewProfile === true && (
        <Link href='/profile/[id]' as={`/profile/${id}`}>
          <button className={styles.btn2}>View Profile</button>
        </Link>
      )}
      {startChatting && (
        <button
          className={styles.startChatBtn}
          onClick={() => startChatting(userProfile)}
        >
          <Icon
            icon={bxMessageRounded}
            style={{ color: '#fff', fontSize: '30px' }}
          />
        </button>
      )}
    </div>
  );
};

export default ConnectionItem;
