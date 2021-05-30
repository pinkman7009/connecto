import React, { useState, useEffect } from 'react';
import styles from '../styles/Main.module.css';
import { Icon, InlineIcon } from '@iconify/react';

import Navbar from '../components/Navbar';
import FeedList from '../components/FeedList';
import Groups from '../components/Groups';
import Loader from '../components/Loader';

import bxsUser from '@iconify/icons-bx/bxs-user';
import usersSolid from '@iconify/icons-clarity/users-solid';
import plusIcon from '@iconify/icons-akar-icons/plus';

import useUser from '../hooks/useUser';
import usePosts from '../hooks/usePosts';

const home = () => {
  const { posts } = usePosts();

  const [addPost, setAddPost] = useState(false);
  const [addEvent, setAddEvent] = useState(false);

  const [allPosts, setAllPosts] = useState([]);

  const { authUser } = useUser();

  useEffect(() => {
    document.title = 'Home - Connecto';

    setAllPosts(posts);
  }, [authUser, posts]);

  return (
    <>
      {Object.keys(authUser).length === 0 ? (
        <Loader loading={true} />
      ) : (
        <div>
          {' '}
          <Navbar />
          <div className={styles.container}>
            <div className={styles.feed}>
              <div className={styles.newButtons}>
                <button
                  className={styles.btn1}
                  onClick={() => setAddPost((prev) => !prev)}
                >
                  New Post
                  <Icon icon={plusIcon} style={{ fontSize: '40px' }} />
                </button>
                <button
                  className={styles.btn2}
                  onClick={() => setAddEvent((prev) => !prev)}
                >
                  New Event
                  <Icon icon={plusIcon} style={{ fontSize: '40px' }} />
                </button>
              </div>
              <p className={styles.text}>All the latest posts and events</p>

              <FeedList
                posts={allPosts}
                setAllPosts={setAllPosts}
                addPost={addPost}
                setAddPost={setAddPost}
                addEvent={addEvent}
                setAddEvent={setAddEvent}
              />
            </div>
            <div className={styles.profileinfo}>
              <div className={styles.userinfo}>
                <div className={styles.avatar}>
                  <Icon
                    icon={bxsUser}
                    style={{ color: '#6e49ff', fontSize: '100px' }}
                  />
                </div>
                <p className={styles.primaryText}>{authUser.fullName}</p>
                <p className={styles.darkText}>{authUser.college}</p>

                <div className={styles.userstats}>
                  <div className={styles.stat}>
                    {authUser.connections && authUser.connections.length}{' '}
                    <Icon
                      icon={usersSolid}
                      style={{ color: '#6e49ff', fontSize: '42px' }}
                    />
                  </div>
                  <p>Groups 4</p>
                </div>
              </div>
              <Groups />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default home;
