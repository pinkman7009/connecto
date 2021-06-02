import React, { useState, useEffect } from 'react';
import styles from '../../styles/Messages.module.css';

import Navbar from '../../components/Navbar';
import MessageBox from '../../components/MessageBox';
import ChatSidebar from '../../components/ChatSidebar';

import useUser from '../../hooks/useUser';
import { getUserChats } from '../../services/firebase';

const messages = () => {
  const { authUser } = useUser();
  const [chat, setChat] = useState([]);

  useEffect(() => {
    document.title = 'Chats - Connecto';

    const getChats = async (id) => {
      const response = await getUserChats(id);

      setChat(response);
    };

    if (authUser.userId) {
      getChats(authUser.userId);
    }
  }, [authUser]);

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.messageFriends}>
          <ChatSidebar chat={chat} viewProfile={false} />
        </div>
        <MessageBox chatRecipient={null} chatBox={false} chatId={null} />
      </div>
    </div>
  );
};

export default messages;
