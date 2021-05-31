import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Modal.module.css';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase';
import useUser from '../hooks/useUser';

const AddEvent = ({ posts, setAllPosts, showModal, setOpenModal }) => {
  const { user } = useContext(UserContext);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { authUser } = useUser();

  const [singleEvent, setSingleEvent] = useState({
    fullName: '',
    title: '',
    body: '',
    type: 'event',
    userId: '',
    college: '',
    time: '',
    people: 0,
    postId: uuidv4(),
  });

  const { fullName, title, body, type, userId, college, time, people, postId } =
    singleEvent;

  useEffect(() => {
    setSingleEvent({
      ...singleEvent,
      fullName: user.displayName,
      userId: user.uid,
    });
  }, [authUser]);

  const handleAddEvent = async () => {
    setAllPosts([
      {
        fullName,
        title,
        body,
        type,
        userId,
        college,
        postId,
        time,
        people,
        dateCreated: Date.now(),
      },
      ...(posts !== null ? posts : []),
    ]);
    setSingleEvent({ title: '', body: '', time: '', college: '' });
    setOpenModal((prev) => !prev);

    try {
      // adding post to firebase
      await firebase.firestore().collection('posts').add({
        title,
        body,
        fullName,
        type,
        userId,
        college,
        postId,
        time,
        people,
        dateCreated: Date.now(),
      });
    } catch (error) {
      console.log('the error that occurred is ', error);
    }
  };

  const onChange = (e) =>
    setSingleEvent({ ...singleEvent, [e.target.name]: e.target.value });

  return (
    <>
      {showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <h2>Create a new Event</h2>
            <input
              name='title'
              type='text'
              className={styles.title}
              onChange={onChange}
              placeHolder='Title'
            />
            <input
              name='time'
              type='text'
              onChange={onChange}
              className={styles.title}
              placeHolder='Time it takes place ( From DD Time to DD Time )'
            />
            <input
              name='college'
              type='text'
              onChange={onChange}
              className={styles.title}
              placeHolder='College conducted by'
            />

            <textarea
              name='body'
              onChange={onChange}
              className={styles.description}
              placeholder='Other details about the event...'
            ></textarea>
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

            <button className={styles.btn} onClick={handleAddEvent}>
              Create
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddEvent;
