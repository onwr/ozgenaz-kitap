import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SplashScreen from 'src/layout/Loader';
import ContentPopup from 'src/modals/ContentModal';

const Bolumler = ({ kitapId }) => {
  const API_BASE_URL = 'http://82.29.178.21:3000';
  const [bolumler, setBolumler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedBolumId, setSelectedBolumId] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [lastProgress, setLastProgress] = useState(null);

  useEffect(() => {
    const fetchBolumler = async () => {
      const response = await fetch(`${API_BASE_URL}/chapters/book/${kitapId}`);
      const data = await response.json();
      setBolumler(data);

      // Check for reading progress
      const savedProgress = localStorage.getItem(`readingProgress_${kitapId}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        // Only show if less than 7 days old
        if (Date.now() - progress.timestamp < 7 * 24 * 60 * 60 * 1000) {
          setLastProgress(progress);
        }
      }

      setLoading(false);
    };
    fetchBolumler();
  }, [kitapId]);

  if (loading) {
    return <SplashScreen />;
  }

  const handleReadClick = (bolumId, title, content, index) => {
    // Save reading progress to localStorage
    const readingProgress = {
      kitapId,
      bolumId,
      title,
      index,
      timestamp: Date.now(),
    };
    localStorage.setItem(`readingProgress_${kitapId}`, JSON.stringify(readingProgress));

    // Existing code
    setSelectedBolumId(bolumId);
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
      setSelectedBolumId(nextChapter.id);

      // Save progress
      const readingProgress = {
        kitapId,
        bolumId: nextChapter.id,
        title: nextChapter.baslik,
        index: currentChapterIndex + 1,
        timestamp: Date.now(),
      };
      localStorage.setItem(`readingProgress_${kitapId}`, JSON.stringify(readingProgress));
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      const prevChapter = bolumler[currentChapterIndex - 1];
      setCurrentChapterIndex(currentChapterIndex - 1);
      setSelectedTitle(prevChapter.baslik);
      setSelectedContent(prevChapter.content);
      setSelectedBolumId(prevChapter.id);

      // Save progress
      const readingProgress = {
        kitapId,
        bolumId: prevChapter.id,
        title: prevChapter.baslik,
        index: currentChapterIndex - 1,
        timestamp: Date.now(),
      };
      localStorage.setItem(`readingProgress_${kitapId}`, JSON.stringify(readingProgress));
    }
  };

  return (
    <motion.div
      className='z-50 container mx-auto mt-5 grid grid-cols-1 gap-5 rounded-2xl border border-black/20 bg-white p-5 md:grid-cols-2 dark:border-0 dark:bg-[#262626]'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {lastProgress && (
        <motion.div
          className='flex flex-col gap-2 rounded-lg bg-blue-500/10 p-4 md:col-span-2 dark:bg-blue-500/5'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-semibold dark:text-white'>
                Kaldığınız Yerden Devam Edin
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>{lastProgress.title}</p>
            </div>
            <motion.button
              className='cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white duration-300 hover:bg-blue-600'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const chapter = bolumler[lastProgress.index];
                handleReadClick(chapter.id, chapter.baslik, chapter.content, lastProgress.index);
              }}
            >
              Devam Et
            </motion.button>
          </div>
        </motion.div>
      )}

      {bolumler &&
        bolumler.map((bolum, index) => (
          <motion.div
            className='flex flex-col gap-2 rounded-lg bg-black/5 p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0 dark:bg-[#1a1a1a] dark:text-white'
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className='flex w-full items-center justify-center gap-4'>
              <p className='text-lg font-semibold lg:text-xl'>{bolum.baslik}</p>
            </div>

            <motion.button
              className='w-full cursor-pointer rounded-lg bg-black py-2 font-semibold text-white duration-300 hover:bg-black/70 dark:bg-[#262626]'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReadClick(bolum.id, bolum.baslik, bolum.content, index)}
            >
              Oku
            </motion.button>
          </motion.div>
        ))}

      <ContentPopup
        title={selectedTitle}
        bolumId={selectedBolumId}
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
