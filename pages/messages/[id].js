import React, { useState, useEffect } from 'react';
import styles from '../../styles/Messages.module.css';

import Navbar from '../../components/Navbar';
import MessageBox from '../../components/MessageBox';
import ChatSidebar from '../../components/ChatSidebar';

import useUser from '../../hooks/useUser';
import { getUserChats } from '../../services/firebase';

import getRecipientName from '../../helpers/getRecipientName';

import { useRouter } from 'next/router';
const chat = () => {
  const { authUser } = useUser();
  const [chat, setChat] = useState([]);
  const [chatRecipient, setChatRecipient] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    document.title = 'Chats - Connecto';

    const getChats = async (id) => {
      const response = await getUserChats(id);

      setChat(response);
    };

    const getRecipient = async (chatId, authUserId) => {
      const response = await getRecipientName(chatId, authUserId);

      setChatRecipient(response[0].fullName);
    };

    if (authUser.userId) {
      getChats(authUser.userId);
      getRecipient(id, authUser.userId);
    }
  }, [authUser]);

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.messageFriends}>
          <ChatSidebar chat={chat} viewProfile={false} />
        </div>
        <MessageBox chatRecipient={chatRecipient} chatBox={true} chatId={id} />
      </div>
    </div>
  );
};

export default chat;
