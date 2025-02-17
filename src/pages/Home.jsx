import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBook } from 'react-icons/fa6';
import Header from '@components/Header';
import Footer from '@components/Footer';

const LogoPattern = () => (
  <div className='fixed inset-0 z-0 grid grid-cols-6 gap-4 p-4'>
    {Array(36)
      .fill(null)
      .map((_, index) => (
        <motion.img
          key={index}
          src='/images/logo.png'
          className='w-full object-contain opacity-5'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.02 }}
        />
      ))}
  </div>
);

const BookCard = ({ kitap, index }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
      className='flex flex-col gap-2 rounded-4xl border border-black/30 py-4 md:shadow-2xl'
    >
      <motion.img
        src={kitap.resim ? kitap.resim : '/images/logo.png'}
        className='mx-auto w-1/2 rounded-2xl md:w-1/3'
      />
      <motion.div className='mx-auto flex flex-col items-center justify-center gap-1 px-2 md:px-0'>
        <motion.p
          className='mx-auto flex items-center gap-1 text-center text-2xl font-semibold'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.3 }}
        >
          <FaBook className='' /> {kitap.kitapAd}
        </motion.p>
        <motion.p
          className='max-w-sm text-center text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.4 }}
        >
          {truncateText(kitap.aciklama, 60)}
        </motion.p>
        <motion.a
          href={`kitap/${kitap.kitapId}`}
          className='mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-4xl bg-[#f5c318] py-2 text-black'
          whileHover={{ scale: 1.05, backgroundColor: '#f3bb0d' }}
          whileTap={{ scale: 0.95 }}
        >
          Daha Fazla <FaArrowRight />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const [kitapData, setKitapData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://45.143.4.156:3000/books');
        const data = await response.json();
        console.log(data.books);
        setKitapData(data.books);
      } catch (error) {
        console.error('Kitap verisi alınamadı:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className='flex min-h-screen flex-col scroll-smooth bg-neutral-100/20 px-2 md:px-0'>
      <LogoPattern />
      <Header />
      <motion.div
        className='relative z-10 container mx-auto my-5 grid grid-cols-1 gap-5 rounded-4xl border border-black/20 bg-white p-5 lg:grid-cols-2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {kitapData.map((kitap, index) => (
          <BookCard key={kitap.kitapId} kitap={kitap} index={index} />
        ))}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Home;
