import React from 'react';
import styles from '../styles/Modal.module.css';

const AddPost = ({ showModal, setOpenModal }) => {
  return (
    <>
      {showModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <h2>Create a new Post</h2>

            <input type='text' className={styles.title} placeHolder='Title' />

            <textarea
              className={styles.description}
              placeholder='Write here..'
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

            <button className={styles.btn}>Create</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddPost;
