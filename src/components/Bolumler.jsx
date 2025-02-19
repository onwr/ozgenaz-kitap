import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa6';
import SplashScreen from 'src/layout/Loader';
import ContentPopup from 'src/modals/ContentModal';

const Bolumler = ({ kitapId }) => {
  const [bolumler, setBolumler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  useEffect(() => {
    const fetchBolumler = async () => {
      const response = await fetch(`http://45.143.4.156:3000/chapters/book/${kitapId}`);
      const data = await response.json();
      setBolumler(data);
      setLoading(false);
    };
    fetchBolumler();
  }, [kitapId]);

  if (loading) {
    return <SplashScreen />;
  }

  const handleReadClick = (title, content, index) => {
    setSelectedTitle(title);
    setSelectedContent(content);
    setCurrentChapterIndex(index);
    setIsPopupOpen(true);
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < bolumler.length - 1) {
      const nextChapter = bolumler[currentChapterIndex + 1];
      setCurrentChapterIndex(currentChapterIndex + 1);
      setSelectedTitle(nextChapter.baslik);
      setSelectedContent(nextChapter.content);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapter = bolumler[currentChapterIndex - 1];
      setCurrentChapterIndex(currentChapterIndex - 1);
      setSelectedTitle(prevChapter.baslik);
      setSelectedContent(prevChapter.content);
    }
  };

  return (
    <motion.div
      className='z-50 container mx-auto mt-5 grid grid-cols-1 gap-5 rounded-2xl border border-black/20 bg-white p-5 md:grid-cols-2'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {bolumler &&
        bolumler.map((bolum, index) => (
          <motion.div
            className='flex flex-col gap-2 rounded-lg bg-black/5 p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0'
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.08)' }}
          >
            <div className='flex w-full items-center justify-center gap-4'>
              <p className='text-lg font-semibold lg:text-xl'>{bolum.baslik}</p>
            </div>

            <motion.button
              className='w-full cursor-pointer rounded-lg bg-black py-2 font-semibold text-white duration-300 hover:bg-black/70'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReadClick(bolum.baslik, bolum.content, index)}
            >
              Oku
            </motion.button>
          </motion.div>
        ))}

      <ContentPopup
        title={selectedTitle}
        content={selectedContent}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onNext={handleNextChapter}
        onPrevious={handlePreviousChapter}
        currentIndex={currentChapterIndex}
        totalChapters={bolumler ? bolumler.length : 0}
      />
    </motion.div>
  );
};

export default Bolumler;
