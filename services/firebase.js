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

// get the posts of a particular user by id
export const getPostsOfUser = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('posts')
    .where('userId', '==', userId)
    .get();

  const posts = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  const postsWithUserDetails = await Promise.all(
    posts.map(async (post) => {
      const user = await getUserById(post.userId);
      const { fullName, college } = user[0];

      return { fullName, college, ...post };
    })
  );

  // console.log('posts of user are', posts);
  postsWithUserDetails.sort((a, b) => b.dateCreated - a.dateCreated);
  return postsWithUserDetails;
};

export const getPostsById = async (userId, connections) => {
  // posts from user's connections
  const result = await firebase
    .firestore()
    .collection('posts')
    .where('userId', 'in', connections)
    .get();

  const userConnectedPosts = result.docs.map((post) => ({
    ...post.data(),
    docId: post.id,
  }));

  // posts from user
  const result2 = await firebase
    .firestore()
    .collection('posts')
    .where('userId', '==', userId)
    .get();

  const authUserPosts = result2.docs.map((post) => ({
    ...post.data(),
    docId: post.id,
  }));

  const allPosts = [...userConnectedPosts, ...authUserPosts];

  const postsWithUserDetails = await Promise.all(
    allPosts.map(async (post) => {
      const user = await getUserById(post.userId);
      const { fullName, college } = user[0];

      return { fullName, college, ...post };
    })
  );
  // console.log('user-connected-posts', userConnectedPosts);

  return postsWithUserDetails;
};

// to get users by search field
export const usersBySearch = async (inputSearch) => {
  const result = await firebase.firestore().collection('users').get();

  // console.log(result.docs);
  const allUsers = result.docs.map((item) => ({ ...item.data() }));

  const searchedUsers = allUsers.filter((user) => {
    const regex = new RegExp(inputSearch, 'gi');
    return user.fullName.match(regex);
  });

  return searchedUsers.slice(0, 5);
};

// to update user's connections

export const updateUserConnections = async (
  authUserDocId,
  profileId,
  isConnected
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(authUserDocId)
    .update({
      connections: isConnected
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
};

// get chats of user by id
export const getUserChats = async (id) => {
  const result = await firebase
    .firestore()
    .collection('chats')
    .where('users', 'array-contains', id)
    .get();

  const chats = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return chats;
};
