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
  return postsWithUserDetails;
};
export const getPostsById = async (userId, connections) => {
  const result = await firebase
    .firestore()
    .collection('posts')
    .where('userId', 'in', connections)
    .get();

  const userConnectedPosts = result.docs.map((post) => ({
    ...post.data(),
    docId: post.id,
  }));

  const postsWithUserDetails = await Promise.all(
    userConnectedPosts.map(async (post) => {
      const user = await getUserById(post.userId);
      const { fullName, college } = user[0];

      return { fullName, college, ...post };
    })
  );
  // console.log('user-connected-posts', userConnectedPosts);

  return postsWithUserDetails;
};
