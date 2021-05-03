import React from 'react';
import styles from '../styles/Connections.module.css';
import Navbar from '../components/Navbar';
import Connections from '../components/Connections';

const connections = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Connections />
      </div>
    </div>
  );
};

export default connections;
