import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserById } from '../services/firebase';

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      // to get user by id
      const [response] = await getUserById(user.uid);
      setActiveUser(response);
    };

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { authUser: activeUser };
};

export default useUser;
