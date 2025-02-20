import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from 'src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.02 }}
        />
      ))}
  </div>
);

const Login = () => {
  const [kul, setKul] = useState('');
  const [sifre, setSifre] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(kul, sifre);
    if (result.success) {
      navigate('/yazarpanel');
    } else {
      setError(result.error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LogoPattern />
      <motion.div
        className='z-10 w-full max-w-xl rounded-2xl p-4 md:bg-white md:drop-shadow-2xl'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.img
          src='/images/logo.png'
          className='mx-auto w-40'
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.p className='text-center text-2xl font-semibold' variants={itemVariants}>
          Yazar Paneli
        </motion.p>
        <motion.form onSubmit={handleSubmit} variants={itemVariants}>
          <motion.div className='flex flex-col gap-1' variants={itemVariants}>
            <motion.label htmlFor='kul' variants={itemVariants}>
              Kullanıcı Adı
            </motion.label>
            <motion.input
              type='text'
              value={kul}
              onChange={(e) => setKul(e.target.value)}
              id='kul'
              placeholder='Kullanıcı Adı'
              className='rounded-xl border border-black/30 bg-white p-2 outline-none'
              whileFocus={{ scale: 1.01, borderColor: 'rgba(0, 0, 0, 0.5)' }}
              autoFocus
            />
          </motion.div>

          <motion.div className='mt-2 flex flex-col gap-1' variants={itemVariants}>
            <motion.label htmlFor='sifre' variants={itemVariants}>
              Şifre
            </motion.label>
            <motion.input
              type='password'
              id='sifre'
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              placeholder='Şifre'
              className='rounded-xl border border-black/30 bg-white p-2 outline-none'
              whileFocus={{ scale: 1.01, borderColor: 'rgba(0, 0, 0, 0.5)' }}
            />
          </motion.div>

          <motion.button
            className='mt-3 w-full rounded-2xl bg-black/70 py-2 font-semibold text-white'
            variants={buttonVariants}
            type='submit'
            initial='rest'
            whileHover='hover'
            whileTap='tap'
          >
            Giriş Yap
          </motion.button>
          {error && <div className='mt-2 text-xs text-red-500'>{error}</div>}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
