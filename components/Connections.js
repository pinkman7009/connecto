import React from 'react';
import styles from '../styles/Connections.module.css';
import ConnectionItem from './ConnectionItem';
const Connections = ({ connections }) => {
  return (
    <div className={styles.connectionlist}>
      <h2>Connections</h2>
      {connections === undefined ? (
        <h3>You have no connections yet</h3>
      ) : (
        connections.map((item) => <ConnectionItem id={item} />)
      )}
    </div>
  );
};

export default Connections;
