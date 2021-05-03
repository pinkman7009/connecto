import React, { useEffect } from 'react';

const notfound = () => {
  useEffect(() => {
    document.title = 'Not Found - Connecto';
  }, []);
  return <section className='page404'>Oops! Page Not Found</section>;
};

export default notfound;
