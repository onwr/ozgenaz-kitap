import Footer from '@components/Footer';
import Header from '@components/Header';
import React from 'react';
import { FaArrowRight, FaBook } from 'react-icons/fa6';

const LogoPattern = () => (
  <div className='fixed inset-0 z-0 grid grid-cols-6 gap-4 p-4'>
    {Array(36)
      .fill(null)
      .map((_, index) => (
        <img key={index} src='/images/logo.png' className='w-full object-contain opacity-5' />
      ))}
  </div>
);

const Home = () => {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className='flex min-h-screen flex-col bg-neutral-100/20 px-2 md:px-0'>
      <LogoPattern />
      <Header />
      <div className='relative z-10 container mx-auto my-5 grid grid-cols-1 gap-5 rounded-4xl border border-black/20 bg-white p-5 lg:grid-cols-2'>
        <div className='flex flex-col gap-2 rounded-4xl py-4 shadow-2xl'>
          <img src='/images/bronz.jpg' className='mx-auto w-1/2 rounded-2xl md:w-1/3' />
          <div className='mx-auto flex flex-col items-center justify-center gap-1 px-2 md:px-0'>
            <p className='mx-auto flex items-center gap-1 text-center text-2xl font-semibold'>
              <FaBook className='' /> BRONZ
            </p>
            <p className='max-w-sm text-center text-sm'>
              {truncateText(
                'asdfkasdflşkasdflişkasdflşasdkfşli askfasş kfasdşlfkasdşilfkasdş lifkasşflkasdşflkasdşflkasdşlifkasdşlfkasdşifkasdşifkasdşifkasşifkasdşlfksaşifkasdşlfksaşilfkasilşfksadşlfasdkf',
                60
              )}
            </p>
            <button className='mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-4xl bg-[#f5c318] py-2 text-black duration-300 hover:scale-105'>
              Daha Fazla <FaArrowRight />
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-2 rounded-4xl py-4 shadow-2xl'>
          <img src='/images/bronz.jpg' className='mx-auto w-1/2 rounded-2xl md:w-1/3' />
          <div className='mx-auto flex flex-col items-center justify-center gap-1 px-2 md:px-0'>
            <p className='mx-auto flex items-center gap-1 text-center text-2xl font-semibold'>
              <FaBook className='' /> BRONZ
            </p>
            <p className='max-w-sm text-center text-sm'>
              {truncateText(
                'asdfkasdflşkasdflişkasdflşasdkfşli askfasş kfasdşlfkasdşilfkasdş lifkasşflkasdşflkasdşflkasdşlifkasdşlfkasdşifkasdşifkasdşifkasşifkasdşlfksaşifkasdşlfksaşilfkasilşfksadşlfasdkf',
                60
              )}
            </p>
            <button className='mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-4xl bg-[#f5c318] py-2 text-black duration-300 hover:scale-105'>
              Daha Fazla <FaArrowRight />
            </button>
          </div>
        </div>
        <div>as</div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
