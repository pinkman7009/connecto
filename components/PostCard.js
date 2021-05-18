import React, { useEffect } from 'react';
import { formatDistance } from 'date-fns';
import styles from '../styles/Feed.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import thumbUp from '@iconify/icons-cil/thumb-up';
import Link from 'next/link';

const PostCard = ({ post }) => {
  useEffect(() => {
    console.log(post);
  }, []);
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.cardTag}>Post</div>
        <p className={styles.cardTitle}>{post.title}</p>
        <Link href='/profile/[id]' as={`/profile/${post.userId}`}>
          <p className={styles.cardBody}>
            written by : <span className={styles.link}>{post.fullName}</span>
          </p>
        </Link>

        <p className={styles.cardBody}>studies at : {post.college}</p>

        <div className={styles.cardFooter}>
          <p>written {formatDistance(post.dateCreated, new Date())} ago</p>
          <div className={styles.cardStats}>
            {post.likes}
            <Icon
              icon={thumbUp}
              style={{ color: '#6e49ff', fontSize: '39px' }}
            />
            {post.dislikes}
            <Icon
              icon={thumbUp}
              style={{ color: '#6e49ff', fontSize: '39px' }}
            />
          </div>
        </div>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.btn}>View Post</button>
      </div>
    </div>
  );
};

export default PostCard;
