import React from 'react';
import styles from '../styles/Feed.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import thumbUp from '@iconify/icons-cil/thumb-up';

const PostCard = ({ post }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.cardTag}>Post</div>
        <p className={styles.cardTitle}>{post.title}</p>
        <p className={styles.cardBody}>written by : {post.by}</p>

        <p className={styles.cardBody}>{post.college}</p>

        <div className={styles.cardFooter}>
          <p>written at {post.time}</p>
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
