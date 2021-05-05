import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Messages.module.css';
import Connections from '../components/Connections';
import MessageBox from '../components/MessageBox';
import useUser from '../hooks/useUser';

const messages = () => {
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
        <div className={styles.messageFriends}>
          <Connections connections={connections} viewProfile={false} />
        </div>
        <MessageBox />
      </div>
    </div>
  );
};

export default messages;
