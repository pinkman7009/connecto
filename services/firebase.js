import { firebase, FieldValue } from '../lib/firebase';

// check if email exists
export const doesEmailExist = async (email) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('emailAddress', '==', email)
    .get();

  return result.docs.map((user) => user.data().length > 0);
};

// get user from firestore
export const getUserById = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};
