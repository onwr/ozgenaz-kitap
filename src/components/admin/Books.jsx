import React, { useEffect, useState, useRef, useMemo } from 'react';
import { FaBookOpen, FaPencil } from 'react-icons/fa6';
import { MdAdd, MdDelete } from 'react-icons/md';
import SplashScreen from 'src/layout/Loader';
import JoditEditor from 'jodit-react';

const Books = ({ adminToken }) => {
  const editor = useRef(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    kitapAd: '',
    okumaSayi: 0,
    aciklama: '',
    resim: '',
  });

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Açıklama...',
    }),
    []
  );

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          resim: data.data.url,
        }));
      } else {
        console.error('Resim yükleme başarısız');
      }
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
    } finally {
      setUploading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://45.143.4.156:3000/books');
      const data = await response.json();
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      console.error('Kitap verisi alınamıyor:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingBook
      ? `http://45.143.4.156:3000/books/${editingBook.kitapId}`
      : 'http://45.143.4.156:3000/books';

    const method = editingBook ? 'PUT' : 'POST';

    const submitData = {
      ...formData,
      kitapId: editingBook?.kitapId || Math.random().toString(36).substr(2, 9),
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        await fetchBooks();
        setIsModalOpen(false);
        setEditingBook(null);
        setFormData({
          kitapAd: '',
          okumaSayi: 0,
          aciklama: '',
          resim: '',
        });
      } else {
        const errorData = await response.json();
        console.error('İşlem başarısız:', errorData);
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const handleDelete = async (kitapId) => {
    if (window.confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`http://45.143.4.156:3000/books/${kitapId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          await fetchBooks();
        } else {
          console.error('Silme işlemi başarısız');
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      kitapAd: book.kitapAd,
      okumaSayi: book.okumaSayi,
      aciklama: book.aciklama,
      resim: book.resim,
    });
    setIsModalOpen(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className='h-full'>
      <div className='flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0'>
        <p className='text-xl font-semibold'>Kitaplar</p>
        <button
          onClick={() => {
            setEditingBook(null);
            setFormData({
              kitapAd: '',
              okumaSayi: 0,
              aciklama: '',
              resim: '',
            });
            setIsModalOpen(true);
          }}
          className='flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#cfbb95] px-5 py-2 text-sm text-white duration-300 hover:bg-black/70 sm:w-auto'
        >
          <MdAdd /> Yeni Kitap
        </button>
      </div>

      <div className='mt-5 flex h-full flex-col gap-5'>
        {books.map((book) => (
          <div
            key={book.kitapId}
            className='flex flex-col items-start justify-between p-3 shadow-2xl sm:flex-row sm:p-5'
          >
            <div className='flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:items-start sm:gap-2'>
              <img src={book.resim} alt={book.kitapAd} className='w-full rounded-2xl sm:w-40' />
              <div className='flex flex-col gap-1 text-center sm:text-left'>
                <p className='text-xl font-medium'>{book.kitapAd}</p>
                <p className='flex items-center justify-center gap-1 text-sm text-black/70 sm:justify-start'>
                  <FaBookOpen /> {book.okumaSayi}
                </p>
                <p
                  className='max-w-xl text-sm'
                  dangerouslySetInnerHTML={{ __html: truncateText(book.aciklama, 200) }}
                />
              </div>
            </div>
            <div className='mt-4 flex w-full items-center justify-center gap-2 sm:mt-0 sm:w-auto sm:justify-start'>
              <button
                onClick={() => handleEdit(book)}
                className='cursor-pointer rounded-full bg-blue-500 p-3 duration-300 hover:bg-blue-700'
              >
                <FaPencil className='text-white' />
              </button>
              <button
                onClick={() => handleDelete(book.kitapId)}
                className='cursor-pointer rounded-full bg-red-500 p-3 duration-300 hover:bg-red-700'
              >
                <MdDelete className='text-white' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-2xl'>
          <div className='max-h-[90vh] w-full max-w-[800px] overflow-y-auto rounded-lg bg-white p-4 sm:p-6'>
            <h2 className='mb-4 text-xl font-semibold'>
              {editingBook ? 'Kitap Düzenle' : 'Yeni Kitap Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='text'
                placeholder='Kitap Adı'
                value={formData.kitapAd}
                onChange={(e) => setFormData({ ...formData, kitapAd: e.target.value })}
                className='rounded border p-2'
                required
              />

              <div className='relative'>
                <JoditEditor
                  ref={editor}
                  value={formData.aciklama}
                  config={config}
                  onChange={(newContent) => setFormData({ ...formData, aciklama: newContent })}
                />
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex-1'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => uploadImage(e.target.files[0])}
                    className='hidden'
                    id='imageUpload'
                  />
                  <label
                    htmlFor='imageUpload'
                    className='inline-block cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                  >
                    {uploading ? 'Yükleniyor...' : 'Resim Seç'}
                  </label>
                </div>
                {formData.resim && (
                  <img
                    src={formData.resim}
                    alt='Preview'
                    className='h-20 w-20 rounded object-cover'
                  />
                )}
              </div>

              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='rounded bg-gray-300 px-4 py-2 text-gray-700'
                >
                  İptal
                </button>
                <button
                  type='submit'
                  className='cursor-pointer rounded bg-[#cfbb95] px-4 py-2 text-white'
                >
                  {editingBook ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
