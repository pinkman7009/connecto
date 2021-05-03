import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Profile from '../../components/Profile';

const profile = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Navbar />

      <Profile id={id} />
    </div>
  );
};

export default profile;
