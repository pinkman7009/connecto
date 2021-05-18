import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Feed.module.css';
import PostCard from './PostCard';
import EventCard from './EventCard';

const FeedList = ({ posts: allPosts }) => {
  const [posts, setPosts] = useState(allPosts);

  return (
    <div className={styles.feedlist}>
      {posts.length >= 1 &&
        posts.map((item) =>
          item.type === 'event' ? (
            <EventCard key={item.postId} event={item} />
          ) : (
            <PostCard key={item.postId} post={item} />
          )
        )}
    </div>
  );
};

export default FeedList;
