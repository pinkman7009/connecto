import React from 'react';
import styles from '../styles/Messages.module.css';
import ChatItem from './ChatItem';
import Loader from '../components/Loader';

const ChatSidebar = ({ chat, viewProfile }) => {
  return (
    <div className={styles.chatlist}>
      <h2>Connections</h2>
      {chat.length === 0 ? (
        <Loader loading={true} />
      ) : chat.length === 0 ? (
        <h3>You have no connections</h3>
      ) : (
        chat.map((item) => <ChatItem key={item.docId} chatId={item.docId} />)
      )}
    </div>
  );
};

export default ChatSidebar;
