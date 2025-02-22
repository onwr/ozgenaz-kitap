import React from 'react';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from 'src/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className='z-10 container mx-auto flex items-center justify-between rounded-b-4xl border border-black/20 bg-white px-3 dark:border-white/10 dark:bg-[#262626] dark:text-white'>
      <a href='http://ozgenaz.com/' className='flex w-full items-center gap-1'>
        <FaArrowLeft className='size-6 md:size-8' />
      </a>
      <a href='/' className='w-full'>
        <img src='/images/logo.png' className='mx-auto block w-24 md:w-32 dark:hidden' alt='logo' />
        <img
          src='/images/logo-white.png'
          className='mx-auto hidden w-24 md:w-32 dark:block'
          alt='logo'
        />
      </a>
      <div className='flex w-full justify-end'>
        <motion.button
          onClick={() => setIsDark(!isDark)}
          className='rounded-md p-2 transition-colors duration-200 dark:text-white'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
