import React, { useState } from 'react';
import { FaBook, FaBookOpen } from 'react-icons/fa6';
import { useAuth } from 'src/context/AuthContext';
import { MdExitToApp } from 'react-icons/md';
import Books from '@components/admin/Books';
import Chapters from '@components/admin/Chapters';

const Panel = () => {
  const { logout } = useAuth();
  const adminToken = localStorage.getItem('adminToken');
  const [screen, setScreen] = useState(0);

  return (
    <div className='flex min-h-screen flex-col lg:flex-row'>
      <div className='flex w-full flex-row items-center gap-3 border-b border-black/20 p-3 shadow-2xl lg:w-[30vh] lg:flex-col lg:gap-5 lg:border-r lg:p-5'>
        <img src='/images/logo.png' className='w-20 lg:w-40' />
        <div className='flex w-full flex-row gap-2 lg:flex-col'>
          <button
            onClick={() => setScreen(0)}
            className={`flex ${screen === 0 && 'bg-black'} w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#cfbc95] p-2 text-sm text-white duration-300 hover:bg-black/70 lg:p-3 lg:text-base`}
          >
            <FaBook /> <span className='hidden lg:inline'>Kitaplar</span>
          </button>
          <button
            onClick={() => setScreen(1)}
            className={`flex ${screen === 1 && 'bg-black'} w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#cfbc95] p-2 text-sm text-white duration-300 hover:bg-black/70 lg:p-3 lg:text-base`}
          >
            <FaBookOpen /> <span className='hidden lg:inline'>Bölümler</span>
          </button>
          <button
            onClick={logout}
            className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-600 p-2 text-sm text-white duration-300 hover:bg-black/70 lg:p-3 lg:text-base'
          >
            <MdExitToApp /> <span className='hidden lg:inline'>Çıkış Yap</span>
          </button>
        </div>
      </div>
      <div className='w-full flex-1 bg-neutral-50 p-4 shadow-inner lg:p-20'>
        <div className='h-full rounded-2xl bg-white p-4 shadow-2xl'>
          {screen === 0 && <Books adminToken={adminToken} />}
          {screen === 1 && <Chapters adminToken={adminToken} />}
        </div>
      </div>
    </div>
  );
};

export default Panel;
