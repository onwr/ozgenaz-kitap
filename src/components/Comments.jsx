import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa6';
import axios from 'axios';

const Comments = ({ bookId }) => {
  const [ad, setAd] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://45.143.4.156:3000/comments/book/${bookId}`);
      setComments(response.data);
    } catch (err) {
      setError('Yorumlar yüklenirken bir hata oluştu.');
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setIsSubmitting(true);
      setError(null);

      try {
        await axios.post(`http://45.143.4.156:3000/comments/${bookId}`, {
          userId: ad,
          yorum: comment,
        });

        await fetchComments();
        setAd('');
        setComment('');
      } catch (err) {
        setError('Yorum gönderilirken bir hata oluştu.');
        console.error('Error posting comment:', err);
      } finally {
        setIsSubmitting(false);
      }
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
      className='z-10 container mx-auto mt-5 gap-5 rounded-2xl border border-black/20 bg-white p-5'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className='mb-6 text-2xl font-semibold'>Yorumlar</h2>

      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='flex flex-col gap-4'>
          <input
            value={ad}
            required
            onChange={(e) => setAd(e.target.value)}
            className='w-full rounded-xl border border-black/20 p-4 focus:ring-2 focus:ring-black/20 focus:outline-none'
            placeholder='Adınız'
            disabled={isSubmitting}
          />
          <textarea
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
            className='w-full resize-none rounded-xl border border-black/20 p-4 focus:ring-2 focus:ring-black/20 focus:outline-none'
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
            className='rounded-xl bg-black/5 p-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='mb-2 flex items-start justify-between'>
              <h3 className='font-semibold'>{comment.userId}</h3>
              <div className='flex items-center gap-2 text-sm text-black/60'>
                <FaClock />
                {formatDate(comment.created_at)}
              </div>
            </div>
            <p className='text-black/80'>{comment.yorum}</p>
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
