import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white'>
      <div>
        <div className='flex h-32 w-32 items-center justify-center'>
          <img src='/images/logo.png' className='animate-ping' />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
