import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

const Comments = ({ bolumId }) => {
  const API_BASE_URL = 'http://82.29.178.21:3000';

  const adminToken = localStorage.getItem('adminToken');
  const [ad, setAd] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const generateRandomEmail = (username) => {
    const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${sanitizedUsername}_${randomString}@gmail.com`;
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chapterComments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (response.ok) {
        await fetchComments();
      } else {
        alert('Silme işlemi başarısız');
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chapterComments/chapter/${bolumId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setComments(response.data);
    } catch (err) {
      setError('Yorumlar yüklenirken bir hata oluştu.');
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadComments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chapterComments/chapter/${bolumId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (mounted) {
          setComments(response.data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Yorumlar yüklenirken bir hata oluştu.');
          console.error('Error fetching comments:', err);
        }
      }
    };

    if (bolumId) {
      loadComments();
    }

    return () => {
      mounted = false;
    };
  }, [bolumId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ad.trim() && comment.trim()) {
      setIsSubmitting(true);
      setError(null);

      try {
        const randomEmail = generateRandomEmail(ad);
        const response = await axios.post(
          `${API_BASE_URL}/chapterComments/${bolumId}`,
          {
            username: ad.trim(),
            email: randomEmail,
            yorum: comment.trim(),
            chapterId: parseInt(bolumId),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        if (response.data) {
          await fetchComments();
          setAd('');
          setComment('');
          setError(null);
        }
      } catch (err) {
        console.error('Error details:', err.response?.data || err.message);
        setError(
          err.response?.data?.error || 'Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError('Lütfen tüm alanları doldurun.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} saat önce`;
    } else {
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  return (
    <motion.div
      className='z-10 container mx-auto mt-5 gap-5 rounded-2xl border border-black/20 bg-white p-5 dark:bg-[#262626]'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className='mb-6 text-2xl font-semibold dark:text-white'>Yorumlar</h2>

      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='flex flex-col gap-4'>
          <input
            value={ad}
            required
            onChange={(e) => setAd(e.target.value)}
            className='w-full rounded-xl border border-black/30 p-4 focus:ring-2 focus:ring-white/20 focus:outline-none dark:border-white/20 dark:text-white dark:placeholder-white/70'
            placeholder='Adınız'
            disabled={isSubmitting}
          />
          {/* Remove email input */}
          <textarea
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
            className='w-full resize-none rounded-xl border border-black/30 p-4 focus:ring-2 focus:ring-white/20 focus:outline-none dark:border-white/20 dark:text-white dark:placeholder-white/70'
            placeholder='Yorumunuzu yazın...'
            rows='4'
            disabled={isSubmitting}
          />
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <motion.button
            type='submit'
            className='self-end rounded-xl bg-black px-8 py-2 font-semibold text-white disabled:opacity-50'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Gönderiliyor...' : 'Yorum Yap'}
          </motion.button>
        </div>
      </form>

      <div className='space-y-6'>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            className='rounded-xl bg-black/5 p-4 dark:border dark:border-black/40 dark:bg-[#1a1a1a]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='mb-2 flex items-start justify-between'>
              <h3 className='font-semibold dark:text-white'>{comment.username}</h3>
              <div className='flex items-center gap-2 text-sm text-black/60 dark:text-white'>
                {adminToken && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className='cursor-pointer rounded-full bg-red-500 p-1 text-white duration-300 hover:bg-red-700'
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
            <p className='text-black/80 dark:text-white/80'>{comment.yorum}</p>
          </motion.div>
        ))}

        {comments.length === 0 && !error && (
          <p className='mt-2 rounded-4xl bg-red-700/50 py-2 text-center text-white md:py-8'>
            Henüz yorum yapılmamış. İlk yorumu siz yapın!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Comments;
