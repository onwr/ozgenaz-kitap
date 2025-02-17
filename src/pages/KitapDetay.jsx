import Header from '@components/Header';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@components/Footer';
import { FaArrowLeft, FaArrowRight, FaBookOpen } from 'react-icons/fa6';
import Comments from '@components/Comments';

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

const ContentPopup = ({
  title,
  content,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalChapters,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='relative z-50 h-full max-h-[100vh] w-full overflow-y-auto bg-white md:rounded-2xl'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className='flex items-center justify-between bg-black p-4 text-white'>
              <p>{title}</p>
              <button onClick={onClose} className='text-xl hover:text-red-600'>
                X
              </button>
            </div>
            <div className='p-6 text-lg leading-relaxed'>{content}</div>

            <div className='sticky bottom-0 flex w-full items-center justify-between gap-2 bg-black p-3'>
              <motion.button
                className='flex w-full items-center justify-center gap-1 rounded-2xl bg-white py-2 duration-300 hover:bg-red-500 hover:text-white'
                onClick={onPrevious}
                disabled={currentIndex === 0}
                whileHover={{ scale: currentIndex === 0 ? 1 : 1.02 }}
                style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
              >
                <FaArrowLeft /> Önceki Bölüm
              </motion.button>
              <motion.button
                className='flex w-full items-center justify-center gap-1 rounded-2xl bg-white py-2 duration-300 hover:bg-red-500 hover:text-white'
                onClick={onNext}
                disabled={currentIndex === totalChapters - 1}
                whileHover={{ scale: currentIndex === totalChapters - 1 ? 1 : 1.02 }}
                style={{ opacity: currentIndex === totalChapters - 1 ? 0.5 : 1 }}
              >
                Sonraki Bölüm <FaArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const KitapDetay = () => {
  const { id } = useParams();
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [kitapData, setKitapData] = useState({
    id: 1,
    kitapAd: 'KONUK SEVMEZ DENİZ',
    kitapResim: '/images/bronz.jpg',
    kitapAciklama: 'Lorem asdfjsadfjkasdflksaflkasdflkşjaflkşasdfklşjadsflkşjadsf',
    bolumler: [
      {
        id: 1,
        begeni: 304,
        bolumAd: 'TANITIM',
        okunmaSayi: '3747',
        content:
          'loremsafjjsdflkjsd flksdaflka jsdfsdajf sadlkjfasd kjfadskfj sdaflkjsadf ljsadflşkjas dflşjasdflşjasd flşadsfjla sşdjfsalşdfj saşlfjasşl dfkjasdlfşkj asdflşjasd flşkjsad flşkjsadfşlkjafdsaklşjfasdlkfşj',
      },
      {
        id: 2,
        begeni: 300,
        bolumAd: 'TANITIM 2',
        okunmaSayi: '37427',
        content: 'fasşlfadsşlfkasdşflkadsflşk',
      },
    ],
  });

  const handleReadClick = (title, content, index) => {
    setSelectedTitle(title);
    setSelectedContent(content);
    setCurrentChapterIndex(index);
    setIsPopupOpen(true);
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < kitapData.bolumler.length - 1) {
      const nextChapter = kitapData.bolumler[currentChapterIndex + 1];
      setCurrentChapterIndex(currentChapterIndex + 1);
      setSelectedTitle(nextChapter.bolumAd);
      setSelectedContent(nextChapter.content);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapter = kitapData.bolumler[currentChapterIndex - 1];
      setCurrentChapterIndex(currentChapterIndex - 1);
      setSelectedTitle(prevChapter.bolumAd);
      setSelectedContent(prevChapter.content);
    }
  };

  return (
    <div className='flex min-h-screen flex-col scroll-smooth bg-neutral-100/20 px-2 select-none md:px-0'>
      <LogoPattern />
      <Header />
      <motion.div
        className='z-50 container mx-auto mt-5 flex flex-col-reverse gap-5 rounded-2xl border border-black/20 bg-white p-5 lg:flex-row'
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
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit...
          </motion.p>
        </motion.div>
        <motion.div
          className='lg:w-1/4'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img
            src={kitapData.kitapResim ? kitapData.kitapResim : '/images/logo.png'}
            className='rounded-3xl'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className='z-50 container mx-auto mt-5 grid grid-cols-1 gap-5 rounded-2xl border border-black/20 bg-white p-5 md:grid-cols-2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {kitapData.bolumler.map((bolum, index) => (
          <motion.div
            className='flex items-center justify-between rounded-lg bg-black/5 p-4'
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.08)' }}
          >
            <div className='flex items-center gap-4'>
              <p className='text-lg font-semibold md:text-xl'>{bolum.bolumAd}</p>
              <p className='flex items-center gap-2 text-sm text-black/70'>
                <FaBookOpen /> {bolum.okunmaSayi}
              </p>
            </div>

            <motion.button
              className='w-20 cursor-pointer rounded-lg bg-black py-2 font-semibold text-white duration-300 hover:bg-black/70 md:w-40'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReadClick(bolum.bolumAd, bolum.content, index)}
            >
              Oku
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <ContentPopup
        title={selectedTitle}
        content={selectedContent}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onNext={handleNextChapter}
        onPrevious={handlePreviousChapter}
        currentIndex={currentChapterIndex}
        totalChapters={kitapData.bolumler.length}
      />

      <Comments bookId={id} />

      <div className='mt-5'></div>
      <Footer />
    </div>
  );
};

export default KitapDetay;
