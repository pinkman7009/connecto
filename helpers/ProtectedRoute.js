import { useEffect, useContext } from 'react';

import UserContext from '../context/user';
import { useRouter } from 'next/router';
import useAuthListener from '../hooks/useAuthListener';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthListener();

  const router = useRouter();

  useEffect(() => {
    if (!user && router.pathname !== '/404') router.push('/');
  }, [user]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default ProtectedRoute;
