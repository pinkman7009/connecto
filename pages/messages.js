import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Messages.module.css';
import Connections from '../components/Connections';
import MessageBox from '../components/MessageBox';
const messages = () => {
  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.messageFriends}>
          <Connections />
        </div>
        <MessageBox />
      </div>
    </div>
  );
};

export default messages;
