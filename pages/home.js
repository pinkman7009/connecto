import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Main.module.css';
import FeedList from '../components/FeedList';
import { Icon, InlineIcon } from '@iconify/react';

import bxsUser from '@iconify/icons-bx/bxs-user';
import usersSolid from '@iconify/icons-clarity/users-solid';
import plusIcon from '@iconify/icons-akar-icons/plus';
const home = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.feed}>
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
          <p className={styles.text}>
            All the latest posts and events from all your connected colleges and
            connections
          </p>
          <FeedList />
        </div>
        <div className={styles.profileinfo}>
          <div className={styles.userinfo}>
            <div className={styles.avatar}>
              <Icon
                icon={bxsUser}
                style={{ color: '#6e49ff', fontSize: '100px' }}
              />
            </div>
            <p className={styles.primaryText}>Soumik Chaudhuri</p>
            <p className={styles.darkText}>
              SRM Institute of Science and Technology
            </p>

            <div className={styles.userstats}>
              <div className={styles.stat}>
                48{' '}
                <Icon
                  icon={usersSolid}
                  style={{ color: '#6e49ff', fontSize: '42px' }}
                />
              </div>
              <p>Groups 4</p>
            </div>
          </div>
          <div className={styles.groups}>
            <p className={styles.primaryText}>Groups you are a part of</p>

            <ul className={styles.groupList}>
              <li>Indian Web Development Community</li>
              <li>The Cricket Talk</li>
              <li>Open Source Developers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
