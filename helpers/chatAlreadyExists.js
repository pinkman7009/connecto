const chatAlreadyExists = (chat, user) => {
  let doesExist = false;
  chat.forEach((item) => {
    let temp = item.data().users.includes(user.userId);

    if (temp === true) {
      doesExist = item.docId;
    }
  });

  return doesExist;
};

export default chatAlreadyExists;
