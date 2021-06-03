import { getUserChats, getUserById } from '../services/firebase';

const getRecipientName = async (chatId, authUserId) => {
  const userChats = await getUserChats(authUserId);

  const usersInChat = userChats.filter((item) => {
    if (item.docId === chatId) {
      return item.users;
    }
  });

  const notAuthUserId = usersInChat[0].users.filter((id) => id !== authUserId);

  const userDetails = await getUserById(notAuthUserId[0]);

  return userDetails;
};

export default getRecipientName;
