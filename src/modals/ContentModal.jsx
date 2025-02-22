import Comments from '@components/Comments';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';

const ContentModal = ({
  title,
  content,
  isOpen,
  onClose,
  bolumId,
  onNext,
  onPrevious,
  currentIndex,
  totalChapters,
}) => {
  const contentRef = useRef(null);
  const [key, setKey] = useState(bolumId);

  useEffect(() => {
    setKey(Date.now());
  }, [bolumId]);

  useEffect(() => {
    if (content && contentRef.current) {
      const contentDiv = contentRef.current;
      contentDiv.innerHTML = content;

      const allElements = contentDiv.getElementsByTagName('*');
      Array.from(allElements).forEach((element) => {
        if (!element.classList.contains('comment-btn')) {
          element.classList.remove('text-black', 'text-white');
          element.classList.add('text-gray-900', 'dark:text-gray-100');
        }
      });

      return () => {
        if (contentRef.current) {
          contentRef.current.innerHTML = '';
        }
      };
    }
  }, [content, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center dark:bg-[#1a1a1a]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='relative z-50 h-full max-h-[100vh] w-full overflow-y-auto bg-white dark:bg-[#262626]'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className='sticky top-0 left-0 flex items-center justify-between bg-black p-4 text-white'>
              <p>{title}</p>
              <button onClick={onClose} className='text-xl hover:text-red-600'>
                X
              </button>
            </div>
            <div ref={contentRef} className='prose prose-lg max-w-none p-6' />
            <div className='sticky bottom-0 flex w-full items-center justify-between gap-2 bg-black p-3'>
              <motion.button
                className='flex w-full items-center justify-center gap-1 rounded-2xl bg-white py-2 duration-300 hover:bg-red-500 hover:text-white'
                onClick={() => {
                  onPrevious();
                  setKey(Date.now());
                }}
                disabled={currentIndex === 0}
                whileHover={{ scale: currentIndex === 0 ? 1 : 1.02 }}
                style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
              >
                <FaArrowLeft /> Önceki Bölüm
              </motion.button>
              <motion.button
                className='flex w-full items-center justify-center gap-1 rounded-2xl bg-white py-2 duration-300 hover:bg-red-500 hover:text-white'
                onClick={() => {
                  onNext();
                  setKey(Date.now());
                }}
                disabled={currentIndex === totalChapters - 1}
                whileHover={{ scale: currentIndex === totalChapters - 1 ? 1 : 1.02 }}
                style={{ opacity: currentIndex === totalChapters - 1 ? 0.5 : 1 }}
              >
                Sonraki Bölüm <FaArrowRight />
              </motion.button>
            </div>
            <Comments key={key} bolumId={bolumId} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentModal;
