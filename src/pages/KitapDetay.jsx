import Header from '@components/Header';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@components/Footer';
import { FaArrowLeft, FaArrowRight, FaBookOpen } from 'react-icons/fa6';
import Comments from '@components/Comments';
import SplashScreen from 'src/layout/Loader';
import Bolumler from '@components/Bolumler';

const LogoPattern = () => (
  <div className='fixed inset-0 z-0 grid grid-cols-6 gap-4 p-4 dark:bg-gradient-to-b dark:from-[#cfbc95] dark:to-white/40'>
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

const KitapDetay = () => {
  const { id } = useParams();
  const [kitapData, setKitapData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`http://45.143.4.156:3000/books/${id}`);
        const data = await response.json();
        setKitapData(data);
        setLoading(false);
      } catch (error) {
        console.error('Kitap verisi alınamadı:', error);
      }
    };

    fetchBookData();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className='flex min-h-screen flex-col scroll-smooth bg-neutral-100/20 px-2 select-none md:px-0 dark:bg-gradient-to-b dark:from-[#cfbc95]/70 dark:to-white/20'>
      <LogoPattern />
      <Header />
      <motion.div
        className='z-50 container mx-auto mt-5 flex flex-col-reverse gap-5 rounded-2xl border border-black/20 bg-white p-5 lg:flex-row dark:border-0 dark:bg-gradient-to-b dark:from-[#cfbc95]/70 dark:to-white/20'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className='flex flex-1 flex-col gap-3'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className='text-center text-3xl font-semibold lg:text-left lg:text-4xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {kitapData.kitapAd}
          </motion.h1>
          <motion.p
            className='text-center text-base leading-relaxed font-medium text-black/70 lg:text-left lg:text-xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: kitapData.aciklama }}
          ></motion.p>
        </motion.div>
        <motion.div
          className='lg:w-1/3'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img
            src={kitapData.resim ? kitapData.resim : '/images/logo.png'}
            className='rounded-3xl'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      </motion.div>

      <Bolumler kitapId={id} />

      <Comments bookId={id} />

      <div className='mt-5'></div>
      <Footer />
    </div>
  );
};

export default KitapDetay;
