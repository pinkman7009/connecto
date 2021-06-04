import React, { useState, useEffect, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styles from '../../styles/Messages.module.css';

import FirebaseContext from '../../context/firebase';

import Navbar from '../../components/Navbar';
import MessageBox from '../../components/MessageBox';
import ChatSidebar from '../../components/ChatSidebar';
import AddChat from '../../components/AddChat';

import useUser from '../../hooks/useUser';

import getRecipientName from '../../helpers/getRecipientName';

import { useRouter } from 'next/router';

const chat = () => {
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const { authUser } = useUser();
  const [user] = useAuthState(firebase.auth());

  const userChatRef = firebase
    .firestore()
    .collection('chats')
    .where('users', 'array-contains', user !== null && user.uid);

  const [chatSnapshot] = useCollection(userChatRef);

  const [chatRecipient, setChatRecipient] = useState('');
  const [addChat, setAddChat] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    document.title = 'Chats - Connecto';

    const getRecipient = async (chatId, authUserId) => {
      const response = await getRecipientName(chatId, authUserId);

      setChatRecipient(response[0].fullName);
    };

    if (authUser.userId) {
      getRecipient(id, authUser.userId);
    }
  }, [user, authUser, id]);

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.messageFriends}>
          {chatSnapshot?.docs && (
            <ChatSidebar chat={chatSnapshot?.docs} setAddChat={setAddChat} />
          )}
        </div>

        <MessageBox chatRecipient={chatRecipient} chatBox={true} chatId={id} />

        {chatSnapshot?.docs && (
          <AddChat
            showModal={addChat}
            setOpenModal={setAddChat}
            chat={chatSnapshot?.docs}
          />
        )}
      </div>
    </div>
  );
};

export default chat;
