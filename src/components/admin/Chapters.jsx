import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import { FaArrowRight, FaBookOpen, FaPencil } from 'react-icons/fa6';
import { MdAdd, MdDelete } from 'react-icons/md';
import SplashScreen from 'src/layout/Loader';
import JoditEditor from 'jodit-react';

const ChapterModalComponent = memo(
  ({
    showModal,
    loading,
    editingChapter,
    formData,
    setFormData,
    setShowModal,
    setEditingChapter,
    handleCreateChapter,
    handleUpdateChapter,
  }) => {
    const editor = useRef(null);
    const config = useMemo(
      () => ({
        readonly: false,
        placeholder: 'İçerik...',
        height: 500,
      }),
      []
    );

    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <div className='w-full max-w-3xl rounded-lg bg-white p-6'>
          <h2 className='mb-4 text-xl font-semibold'>
            {editingChapter ? 'Bölümü Düzenle' : 'Yeni Bölüm'}
          </h2>
          <input
            type='text'
            placeholder='Başlık'
            className='mb-4 w-full rounded border p-2'
            value={formData.baslik}
            onChange={(e) => setFormData((prev) => ({ ...prev, baslik: e.target.value }))}
          />
          <JoditEditor
            ref={editor}
            value={formData.content}
            config={config}
            onChange={(newContent) => setFormData((prev) => ({ ...prev, content: newContent }))}
          />
          <div className='mt-3 flex justify-end gap-2'>
            <button
              onClick={() => {
                setShowModal(false);
                setEditingChapter(null);
                setFormData({ baslik: '', content: '', begeniSayi: 0 });
              }}
              className='rounded bg-gray-200 px-4 py-2'
            >
              İptal
            </button>
            <button
              onClick={() =>
                editingChapter ? handleUpdateChapter(editingChapter.id) : handleCreateChapter()
              }
              disabled={loading}
              className='cursor-pointer rounded bg-blue-500 px-4 py-2 text-white'
            >
              {editingChapter ? 'Güncelle' : 'Oluştur'}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

const Chapters = ({ adminToken }) => {
  const API_BASE_URL = 'http://82.29.178.21:3000';
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    baslik: '',
    content: '',
    begeniSayi: 0,
  });
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'İçerik...',
    }),
    []
  );
  const fetchBooks = async () => {
    try {
      const response = await fetch('https://82.29.178.21/books');
      const data = await response.json();
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      console.error('Kitaplar getirilirken bir hata oluştu:', error);
    }
  };

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/chapters/book/${selectedBook}`);
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error('Bölümler getirilirken bir hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBook != null) {
      fetchChapters();
    }
  }, [selectedBook]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleCreateChapter = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/chapters/${selectedBook}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchChapters();
        setShowModal(false);
        setFormData({ baslik: '', content: '', begeniSayi: 0 });
      }
    } catch (error) {
      console.error('Bölüm oluşturulurken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateChapter = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chapters/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchChapters();
        setShowModal(false);
        setEditingChapter(null);
        setFormData({ baslik: '', content: '', begeniSayi: 0 });
      }
    } catch (error) {
      console.error('Bölüm güncellenirken hata:', error);
    }
  };

  const handleDeleteChapter = async (id) => {
    if (window.confirm('Bu bölümü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/chapters/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          fetchChapters();
        }
      } catch (error) {
        console.error('Bölüm silinirken hata:', error);
      }
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className='h-full'>
      {showModal && (
        <ChapterModalComponent
          showModal={showModal}
          loading={loading}
          editingChapter={editingChapter}
          formData={formData}
          setFormData={setFormData}
          setShowModal={setShowModal}
          setEditingChapter={setEditingChapter}
          handleCreateChapter={handleCreateChapter}
          handleUpdateChapter={handleUpdateChapter}
        />
      )}
      <div>
        {selectedBook ? (
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0'>
            <p className='text-xl font-semibold'>Bölümler</p>
            <button
              onClick={() => setShowModal(true)}
              className='flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#cfbb95] px-5 py-2 text-sm text-white duration-300 hover:bg-black/70 sm:w-auto'
            >
              <MdAdd /> Yeni Bölüm
            </button>
          </div>
        ) : (
          <div className='flex items-center justify-between'>
            <p className='text-xl font-semibold'>Kitap Seçiniz</p>
          </div>
        )}
      </div>

      {selectedBook ? (
        <div className='mt-5 flex h-full flex-col gap-5'>
          {chapters.map((chapter) => (
            <div key={chapter.id} className='rounded-2xl bg-white p-3 drop-shadow-2xl sm:p-5'>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0'>
                <p className='text-center text-xl font-semibold sm:text-left'>{chapter.baslik}</p>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => {
                      setEditingChapter(chapter);
                      setFormData({
                        baslik: chapter.baslik,
                        content: chapter.content,
                        begeniSayi: chapter.begeniSayi,
                      });
                      setShowModal(true);
                    }}
                    className='cursor-pointer rounded-full bg-blue-500 p-3 text-white duration-300 hover:bg-blue-700'
                  >
                    <FaPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteChapter(chapter.id)}
                    className='cursor-pointer rounded-full bg-red-500 p-3 text-white duration-300 hover:bg-red-700'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-5 flex h-full flex-col gap-5'>
          {books.map((book) => (
            <div
              key={book.kitapId}
              className='flex flex-col items-center justify-between p-3 shadow-2xl sm:flex-row sm:items-start sm:p-5'
            >
              <div className='flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-2'>
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
              <div className='mt-4 flex items-center gap-2 sm:mt-0'>
                <button
                  onClick={() => {
                    setSelectedBook(book.kitapId);
                    setEditingChapter(null);
                  }}
                  className='flex cursor-pointer items-center gap-1 rounded-full bg-blue-500 p-3 text-xs font-semibold text-white duration-300 hover:bg-blue-700'
                >
                  SEÇ
                  <FaArrowRight className='text-white' />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chapters;
