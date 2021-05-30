import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/Profile.module.css';

import { Icon, InlineIcon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';
import usersSolid from '@iconify/icons-clarity/users-solid';
import plusIcon from '@iconify/icons-akar-icons/plus';

import Groups from './Groups';
import FeedList from './FeedList';
import Loader from './Loader';
import AddPost from '../components/AddPost';
import AddEvent from '../components/AddEvent';

import { getUserById, getPostsOfUser } from '../services/firebase';
import useUser from '../hooks/useUser';

import UserContext from '../context/user';

const Profile = ({ id }) => {
  const { user } = useContext(UserContext);
  const { authUser } = useUser();

  const [addPost, setAddPost] = useState(false);
  const [addEvent, setAddEvent] = useState(false);

  const [userProfile, setUserProfile] = useState({});
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserProfileData = async (id) => {
      const [response] = await getUserById(id);

      setUserProfile(response);

      if (id === user.uid) setIsAuthUser(true);
      else if (authUser.connections !== undefined) {
        if (authUser.connections.includes(id)) setIsConnected(true);
        else setIsConnected(false);
      }
    };
    const fetchPosts = async (id) => {
      const response = await getPostsOfUser(id);

      setPosts(response);
    };
    if (id !== null && id !== undefined) {
      fetchUserProfileData(id);
      fetchPosts(id);
    }
  }, [id, authUser]);

  const addToConnections = () => {
    // add current user id to connections of auth user id
    console.log('current user id: ', id);
    console.log('auth user id: ', user.uid);

    setIsConnected(true);
  };

  return (
    <>
      {authUser === undefined ||
      user === undefined ||
      authUser === null ||
      user === null ||
      Object.keys(authUser).length === 0 ||
      Object.keys(user).length === 0 ? (
        <Loader loading={true} />
      ) : (
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
              {!isAuthUser === true ? (
                <button
                  disabled={isConnected}
                  className={`${isConnected && styles.isconnected} ${
                    styles.btn2
                  }`}
                  onClick={addToConnections}
                >
                  {isConnected === true ? 'Connected' : 'Connect'}
                  <Icon icon={plusIcon} style={{ fontSize: '40px' }} />
                </button>
              ) : null}
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
          {isAuthUser === true ? (
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
          ) : null}

          <p className={styles.text}>
            {isAuthUser === true ? 'Your' : `${userProfile.fullName}'s`} recent
            posts and events
          </p>

          <div className={styles.profileFeed}>
            <div className={styles.groups}>
              <Groups />
            </div>

            <FeedList
              posts={posts}
              setAllPosts={setPosts}
              addPost={addPost}
              setAddPost={setAddPost}
              addEvent={addEvent}
              setAddEvent={setAddEvent}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
