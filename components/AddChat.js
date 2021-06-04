import React, { useState, useContext, useEffect } from 'react';

import styles from '../styles/Modal.module.css';
import Connections from '../components/Connections';
import FirebaseContext from '../context/firebase';

import useUser from '../hooks/useUser';
import chatAlreadyExists from '../helpers/chatAlreadyExists';

import { useRouter } from 'next/router';

const AddChat = ({ showModal, setOpenModal, chat }) => {
  const { firebase } = useContext(FirebaseContext);
  const { authUser } = useUser();
  const [connections, setConnections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setConnections(authUser.connections);
  }, [authUser]);

  const startChatting = async (user) => {
    const response = chatAlreadyExists(chat, user);
    setOpenModal((prev) => !prev);

    if (response) {
      router.push(`/messages/${response}`);
    } else {
      const response = await firebase
        .firestore()
        .collection('chats')
        .add({
          users: [authUser.userId, user.userId],
        });

      router.push(`/messages/${response.id}`);
    }
  };
  return (
    <>
      {showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <h2>Start a new chat</h2>
            <Connections
              connections={connections}
              startChatting={startChatting}
            />
            <button
              onClick={() => setOpenModal((prev) => !prev)}
              className={styles.close}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddChat;
