import React, { useState, useContext, useEffect } from 'react';
import styles from '../styles/Connections.module.css';
import Navbar from '../components/Navbar';
import Connections from '../components/Connections';

import useUser from '../hooks/useUser';

const connections = () => {
  const { authUser } = useUser();
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    document.title = 'Connections - Connecto';

    setConnections(authUser.connections);
  }, [authUser]);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Connections connections={connections} viewProfile={true} />
      </div>
    </div>
  );
};

export default connections;
