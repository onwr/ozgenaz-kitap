import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

const Header = () => {
  return (
    <div className='z-10 container mx-auto flex items-center justify-between rounded-b-4xl border border-black/20 bg-white px-3'>
      <a href='http://ozgenaz.com/' className='flex w-full items-center gap-1'>
        <FaArrowLeft className='size-6 md:size-8' />
      </a>
      <a href='/' className='w-full'>
        <img src='/images/logo.png' className='mx-auto w-24 md:w-32' />
      </a>
      <div className='w-full'></div>
    </div>
  );
};

export default Header;
