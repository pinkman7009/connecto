import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import Cookie from 'js-cookie';

const useAuthListener = () => {
  const [user, setUser] = useState(Cookie.getJSON('authUser'));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        Cookie.set('authUser', JSON.stringify(authUser), { expires: 100 });
        setUser(authUser);
      } else {
        Cookie.remove('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
};
export default useAuthListener;
