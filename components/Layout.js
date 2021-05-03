import React from 'react';
import UserContext from '../context/user';
import useAuthListener from '../hooks/useAuthListener';

const Layout = ({ children }) => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <main>{children}</main>
    </UserContext.Provider>
  );
};

export default Layout;
