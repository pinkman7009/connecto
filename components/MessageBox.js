import React, { useState, useEffect } from 'react';
import styles from '../styles/Messages.module.css';
import MessageItem from '../components/MessageItem';

const MessageBox = () => {
  const [currentMessage, setCurrentMessage] = useState('');

  let messages = [
    {
      name: 'Harsh Gupta',
      message: 'Hey this is a test message 1',
    },
    {
      name: 'Soumik Chaudhuri',
      message: 'Hey this is a test message 2',
    },
    {
      name: 'Harsh Gupta',
      message: 'Hey this is a test message 3',
    },
    {
      name: 'Soumik Chaudhuri',
      message: 'Hey this is a test message 4',
    },
  ];

  const [allMessages, setAllMessages] = useState(messages);

  const sendMessage = () => {
    setAllMessages(
      allMessages.concat({ name: 'Soumik Chaudhuri', message: currentMessage })
    );
    setCurrentMessage('');
    var element = document.getElementById('messagearea');
    window.scrollTo(0, element.offsetHeight);
  };
  return (
    <div className={styles.messagebox}>
      <div className={styles.messageheader}>
        <h3>Harsh Gupta</h3>
        <p>Online 35m ago</p>
      </div>
      <div className={styles.messagearea} id='messagearea'>
        {allMessages.map((item) => (
          <MessageItem name={item.name} message={item.message} />
        ))}
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
      </div>
    </div>
  );
};

export default MessageBox;
