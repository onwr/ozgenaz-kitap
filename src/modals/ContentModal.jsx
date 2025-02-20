import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const ContentModal = ({
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
            className='relative z-50 h-full max-h-[100vh] w-full overflow-y-auto bg-white md:rounded-2xl dark:bg-gradient-to-b dark:from-[#cfbc95]/70 dark:to-white/20'
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

export default ContentModal;
