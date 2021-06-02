import React, { useState, useEffect } from 'react';
import styles from '../styles/Messages.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';
import { getUserById } from '../services/firebase';
import getRecipientName from '../helpers/getRecipientName';

import useUser from '../hooks/useUser';

import { useRouter } from 'next/router';

const ChatItem = ({ chatId }) => {
  const { authUser } = useUser();

  const [userProfile, setUserProfile] = useState({});

  const router = useRouter();

  useEffect(() => {
    const fetchUserProfileData = async (authUserId) => {
      const response = await getRecipientName(chatId, authUserId);

      setUserProfile(response[0]);
    };
    if (authUser.userId) fetchUserProfileData(authUser.userId);
  }, [authUser]);

  const enterChat = () => {
    router.push(`/messages/${chatId}`);
  };
  return (
    <div className={styles.chatitem} onClick={enterChat}>
      <div className={styles.avatar}>
        <Icon icon={bxsUser} style={{ color: '#6e49ff', fontSize: '50px' }} />
      </div>
      {userProfile.fullName}
    </div>
  );
};

export default ChatItem;
