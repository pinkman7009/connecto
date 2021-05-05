import React from 'react';
import styles from '../styles/Connections.module.css';
import ConnectionItem from './ConnectionItem';
import Loader from '../components/Loader';

const Connections = ({ connections, viewProfile }) => {
  return (
    <div className={styles.connectionlist}>
      <h2>Connections</h2>
      {connections === undefined ? (
        <Loader loading={true} />
      ) : connections.length === 0 ? (
        <h3>You have no connections</h3>
      ) : (
        connections.map((item) => (
          <ConnectionItem id={item} viewProfile={viewProfile} />
        ))
      )}
    </div>
  );
};

export default Connections;
