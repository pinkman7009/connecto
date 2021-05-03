import React from 'react';
import styles from '../styles/Main.module.css';

const Groups = () => {
  return (
    <div className={styles.groups}>
      <p className={styles.primaryText}>Groups you are a part of</p>

      <ul className={styles.groupList}>
        <li>Indian Web Development Community</li>
        <li>The Cricket Talk</li>
        <li>Open Source Developers</li>
      </ul>
    </div>
  );
};

export default Groups;
