import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <div className='container'>
      <BeatLoader loading={loading} size={30} color='#6e49ff' />
    </div>
  );
};

export default Loader;
