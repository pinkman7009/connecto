import React, { useState, useContext, useEffect } from 'react';
import styles from '../styles/Connections.module.css';
import Navbar from '../components/Navbar';
import Connections from '../components/Connections';

import UserContext from '../context/user';
import useUser from '../hooks/useUser';

const connections = () => {
  const { user } = useUser();
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    document.title = 'Connections - Connecto';

    setConnections(user.connections);
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Connections connections={connections} />
      </div>
    </div>
  );
};

export default connections;
