import React from 'react';
import styles from '../styles/Connections.module.css';
import ConnectionItem from './ConnectionItem';
const Connections = () => {
  const connections = [
    {
      name: 'Harsh Gupta',
    },
    {
      name: 'Alex Thomas',
    },
    {
      name: 'Pavan Komishitty',
    },
    {
      name: 'Michael Jackson',
    },
  ];
  return (
    <div className={styles.connectionlist}>
      <h2>Connections</h2>
      {connections.map((item) => (
        <ConnectionItem name={item.name} />
      ))}
    </div>
  );
};

export default Connections;
