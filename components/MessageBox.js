import React, { useState, useEffect, useContext, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import styles from '../styles/Messages.module.css';
import MessageItem from '../components/MessageItem';

import UserContext from '../context/user';
import FirebaseContext from '../context/firebase';

const MessageBox = ({ chatRecipient, chatBox, chatId }) => {
  const { user } = useContext(UserContext);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const endOfMessageRef = useRef(null);

  const [currentMessage, setCurrentMessage] = useState('');

  const [messagesSnapshot] = useCollection(
    firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('dateCreated', 'asc')
  );

  const scrollToBottom = () => {
    endOfMessageRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesSnapshot]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      await firebase
        .firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          dateCreated: Date.now(),
          message: currentMessage,
          user: user.displayName,
        });

      setCurrentMessage('');
      scrollToBottom();
    }
  };
  return (
    <>
      <div className={styles.messagebox}>
        {' '}
        <div className={styles.messageheader}>
          <h3>{chatRecipient}</h3>
        </div>
        <div className={styles.messagearea} id='messagearea'>
          {messagesSnapshot &&
            messagesSnapshot.docs.map((message) => (
              <MessageItem
                key={message.id}
                name={message.data().user}
                message={message.data().message}
              />
            ))}
          <div ref={endOfMessageRef}></div>
        </div>
        <div className={styles.messageInputBox}>
          <textarea
            placeholder='Write a message....'
            className={styles.message}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          ></textarea>
          <button onClick={sendMessage} className={styles.btn2}>
            Send
          </button>
        </div>{' '}
      </div>
    </>
  );
};

export default MessageBox;
