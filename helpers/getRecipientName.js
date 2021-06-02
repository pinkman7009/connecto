import { getUserChats, getUserById } from '../services/firebase';

const getRecipientName = async (chatId, authUserId) => {
  const userChats = await getUserChats(authUserId);

  const usersInChat = userChats.map((item) => {
    if (item.docId === chatId) {
      return item.users;
    }
  });

  const notAuthUserId = usersInChat[0].filter((id) => id !== authUserId);

  const userDetails = await getUserById(notAuthUserId[0]);

  return userDetails;
};

export default getRecipientName;
