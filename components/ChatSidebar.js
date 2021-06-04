import React, { useState } from 'react';
import styles from '../styles/Messages.module.css';
import ChatItem from './ChatItem';

import { Icon, InlineIcon } from '@iconify/react';

import plusIcon from '@iconify/icons-akar-icons/plus';
const ChatSidebar = ({ chat, setAddChat }) => {
  return (
    <div className={styles.chatlist}>
      <h2>Chats</h2>
      <button
        className={styles.btnAdd}
        onClick={() => setAddChat((prev) => !prev)}
      >
        Start a new chat <Icon icon={plusIcon} style={{ fontSize: '30px' }} />
      </button>

      {chat.map((item) => (
        <ChatItem key={item.id} chatId={item.id} />
      ))}
    </div>
  );
};

export default ChatSidebar;
