import React, { useState } from 'react';
import styles from '../styles/Messages.module.css';
import ChatItem from './ChatItem';
import Loader from '../components/Loader';
import AddChat from '../components/AddChat';
import { Icon, InlineIcon } from '@iconify/react';

import plusIcon from '@iconify/icons-akar-icons/plus';
const ChatSidebar = ({ chat, setAddChat }) => {
  return (
    <div className={styles.chatlist}>
      <h2>Connections</h2>
      <button
        className={styles.btnAdd}
        onClick={() => setAddChat((prev) => !prev)}
      >
        Start a new chat <Icon icon={plusIcon} style={{ fontSize: '30px' }} />
      </button>
      {chat.length === 0 ? (
        <Loader loading={true} />
      ) : chat.length === 0 ? (
        <h3>You have no chats right now</h3>
      ) : (
        chat.map((item) => <ChatItem key={item.docId} chatId={item.docId} />)
      )}
    </div>
  );
};

export default ChatSidebar;
