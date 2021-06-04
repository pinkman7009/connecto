import React, { useState, useContext } from 'react';
import styles from '../../styles/Messages.module.css';

import Navbar from '../../components/Navbar';

import ChatSidebar from '../../components/ChatSidebar';
import AddChat from '../../components/AddChat';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import FirebaseContext from '../../context/firebase';

const messages = () => {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [addChat, setAddChat] = useState(false);
  const [user] = useAuthState(firebase.auth());

  const userChatRef = firebase
    .firestore()
    .collection('chats')
    .where('users', 'array-contains', user !== null && user.uid);

  const [chatSnapshot] = useCollection(userChatRef);

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.messageFriends}>
          {chatSnapshot?.docs && (
            <ChatSidebar chat={chatSnapshot?.docs} setAddChat={setAddChat} />
          )}
        </div>
        <div className={styles.nomessagebox}>
          <h2>No chats open! Click on a chat to get started talking!</h2>
        </div>
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

export default messages;
