import React, { useState, useEffect } from 'react';
import styles from '../../styles/Messages.module.css';

import Navbar from '../../components/Navbar';

import ChatSidebar from '../../components/ChatSidebar';
import AddChat from '../../components/AddChat';

import useUser from '../../hooks/useUser';
import { getUserChats } from '../../services/firebase';

const messages = () => {
  const { authUser } = useUser();
  const [chat, setChat] = useState([]);
  const [addChat, setAddChat] = useState(false);

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
          <ChatSidebar chat={chat} setAddChat={setAddChat} />
        </div>
        <div className={styles.nomessagebox}>
          <h2>No chats open! Click on a chat to get started talking!</h2>
        </div>
        <AddChat showModal={addChat} setOpenModal={setAddChat} />
      </div>
    </div>
  );
};

export default messages;
