import React, { useState } from 'react'
import { motion } from 'framer-motion';

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
  const [kul, setKul] = useState("")
  const [sifre, setSifre] = useState("")

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(0, 0, 0, 1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <LogoPattern />
      <motion.div 
        className='md:bg-white z-10 w-full max-w-xl rounded-2xl p-4 md:drop-shadow-2xl'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img 
          src="/images/logo.png" 
          className='w-40 mx-auto'
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.p 
          className='text-2xl text-center font-semibold'
          variants={itemVariants}
        >
          Yazar Paneli
        </motion.p>
        <motion.form variants={itemVariants}>
          <motion.div 
            className='flex flex-col gap-1'
            variants={itemVariants}
          >
            <motion.label 
              htmlFor="kul"
              variants={itemVariants}
            >
              Kullanıcı Adı
            </motion.label>
            <motion.input 
              type="text" 
              id="kul" 
              placeholder='Kullanıcı Adı' 
              className='p-2 bg-white border border-black/30 rounded-xl outline-none'
              whileFocus={{ scale: 1.01, borderColor: "rgba(0, 0, 0, 0.5)" }}
              autoFocus 
            />
          </motion.div>

          <motion.div 
            className='flex flex-col gap-1 mt-2'
            variants={itemVariants}
          >
            <motion.label 
              htmlFor="sifre"
              variants={itemVariants}
            >
              Şifre
            </motion.label>
            <motion.input 
              type="password" 
              id="sifre" 
              placeholder='Şifre' 
              className='p-2 bg-white border border-black/30 rounded-xl outline-none'
              whileFocus={{ scale: 1.01, borderColor: "rgba(0, 0, 0, 0.5)" }}
            />
          </motion.div>

          <motion.button 
            className='w-full py-2 bg-black/70 text-white font-semibold rounded-2xl mt-3'
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Giriş Yap
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Login