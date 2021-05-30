import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Modal.module.css';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase';
import useUser from '../hooks/useUser';

const AddPost = ({ posts, setAllPosts, showModal, setOpenModal }) => {
  const { user } = useContext(UserContext);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { authUser } = useUser();

  const [singlePost, setSinglePost] = useState({
    fullName: '',
    title: '',
    body: '',
    likes: 0,
    dislikes: 0,
    type: 'post',
    userId: '',
    college: '',
    postId: uuidv4(),
  });

  const {
    fullName,
    title,
    body,
    likes,
    dislikes,
    type,
    userId,
    college,
    postId,
  } = singlePost;

  useEffect(() => {
    setSinglePost({
      ...singlePost,
      college: authUser.college,
      fullName: user.displayName,
      userId: user.uid,
    });
  }, [authUser]);

  const handleAddPost = async () => {
    setAllPosts([
      {
        fullName,
        title,
        body,
        likes,
        dislikes,
        type,
        userId,
        college,
        postId,
        dateCreated: Date.now(),
      },
      ...(posts !== null ? posts : []),
    ]);
    setSinglePost({ title: '', body: '' });
    setOpenModal((prev) => !prev);

    try {
      // adding post to firebase
      await firebase.firestore().collection('posts').add({
        title,
        body,
        fullName,
        likes,
        dislikes,
        type,
        userId,
        college,
        postId,
        dateCreated: Date.now(),
      });
    } catch (error) {
      console.log('the error that occurred is ', error);
    }
  };

  const onChange = (e) =>
    setSinglePost({ ...singlePost, [e.target.name]: e.target.value });

  return (
    <>
      {showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <h2>Create a new Post</h2>

            <input
              name='title'
              type='text'
              className={styles.title}
              value={title}
              placeHolder='Title'
              onChange={onChange}
            />

            <textarea
              name='body'
              className={styles.description}
              placeholder='Write here..'
              value={body}
              onChange={onChange}
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

            <button className={styles.btn} onClick={handleAddPost}>
              Create
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddPost;
