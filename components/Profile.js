import React, { useState, useEffect } from 'react';
import styles from '../styles/Profile.module.css';

import { Icon, InlineIcon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';
import usersSolid from '@iconify/icons-clarity/users-solid';
import plusIcon from '@iconify/icons-akar-icons/plus';

import Groups from './Groups';
import FeedList from './FeedList';

import { getUserById } from '../services/firebase';

const Profile = ({ id }) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const fetchUserProfileData = async (id) => {
      const [response] = await getUserById(id);

      setUserProfile(response);
    };
    if (id !== null && id !== undefined) fetchUserProfileData(id);
  });

  return (
    <div className={styles.container}>
      <div className={styles.userinfo}>
        <div className={styles.avatar}>
          <Icon
            icon={bxsUser}
            style={{ color: '#6e49ff', fontSize: '100px' }}
          />
        </div>

        <div className={styles.profileinfo}>
          <p className={styles.primaryText}>{userProfile.fullName}</p>
          <p className={styles.darkText}>{userProfile.college}</p>
        </div>

        <div className={styles.userstats}>
          <div className={styles.stat}>
            {userProfile.connections && userProfile.connections.length}{' '}
            <Icon
              icon={usersSolid}
              style={{ color: '#6e49ff', fontSize: '42px' }}
            />
          </div>
          <p>Groups 4</p>
        </div>
      </div>
      <div className={styles.newButtons}>
        <button className={styles.btn1}>
          New Post
          <Icon icon={plusIcon} style={{ fontSize: '40px' }} />
        </button>
        <button className={styles.btn2}>
          New Event
          <Icon icon={plusIcon} style={{ fontSize: '40px' }} />
        </button>
      </div>
      <p className={styles.text}>Your recent posts and events</p>
      <div className={styles.profileFeed}>
        <div className={styles.groups}>
          <Groups />
        </div>
        <FeedList />
      </div>
    </div>
  );
};

export default Profile;
