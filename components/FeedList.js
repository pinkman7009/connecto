import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Feed.module.css';
import PostCard from './PostCard';
import EventCard from './EventCard';

import AddPost from '../components/AddPost';
import AddEvent from '../components/AddEvent';

const FeedList = ({
  posts: allPosts,
  setAllPosts,
  addPost,
  setAddPost,
  addEvent,
  setAddEvent,
}) => {
  return (
    <>
      {allPosts && (
        <div className={styles.feedlist}>
          {allPosts.length >= 1 &&
            allPosts.map((item) =>
              item.type === 'event' ? (
                <EventCard key={item.postId} event={item} />
              ) : (
                <PostCard key={item.postId} post={item} />
              )
            )}
        </div>
      )}
      <AddPost
        posts={allPosts}
        setAllPosts={setAllPosts}
        showModal={addPost}
        setOpenModal={setAddPost}
      />
      <AddEvent showModal={addEvent} setOpenModal={setAddEvent} />
    </>
  );
};

export default FeedList;
