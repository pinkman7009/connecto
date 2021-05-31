import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import {
  getPostsById,
  getUserById,
  getPostsOfUser,
} from '../services/firebase';

const usePosts = () => {
  const [posts, setPosts] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getPosts = async () => {
      const userFromFirebase = await getUserById(user.uid);

      const connections = userFromFirebase[0].connections;

      // console.log('posts of user are', posts);

      let connectionPosts = [];

      if (connections.length > 0) {
        connectionPosts = await getPostsById(user.uid, connections);

        // to sort the posts according to their created date

        connectionPosts.sort((a, b) => b.dateCreated - a.dateCreated);
        setPosts(connectionPosts);
      } else {
        // if user does not have any connections just show their posts if they have any
        const authUserPosts = await getPostsOfUser(user.uid);

        authUserPosts.sort((a, b) => b.dateCreated - a.dateCreated);
        setPosts(authUserPosts);
      }
    };

    if (user?.uid) {
      getPosts();
    }
  }, [user]);

  return { posts };
};

export default usePosts;
