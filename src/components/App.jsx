import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import axios from 'axios';
import css from './App.module.css';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setlargeImageURL] = useState(null);
  const [query, setQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  
  const getQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(pPage => pPage + 1);
  };

  async function fetchImages(searchQuery, page) {
    setStatus('pending');
    const key = '30339052-e4d079f5519c217cf05ffdccc';
    const per_page = 12;
    axios.defaults.baseURL = 'https://pixabay.com/';
    try {
      const result = await axios.get('api/', {
        params: {
          q: searchQuery,
          page,
          per_page,
          key,
          image_type: 'photo',
          orientation: 'horizontal',
        },
      });
      const apiImages = result.data.hits;
      if (apiImages.length > 0) {
        setImages(pImages => [...pImages, ...apiImages]);
        setStatus('resolved');
      } else {
        setStatus('rejected');
      }
    } catch (er) {
      setStatus('rejected');
      setError(er.message);
      console.log(error);
      throw new Error();
    }
  }

  const closeImage = e => {
    if (e.target === e.currentTarget) setlargeImageURL(null);
  };

  const closeOnEscape = () => {
    setlargeImageURL(null);
  };

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  useEffect(() => {
    if(page > 1 && status === 'resolved')
    window.scrollBy({
      top: window.innerHeight -144,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className={css.app}>
      <SearchBar getQuery={getQuery} />
      <ImageGallery images={images} openImage={setlargeImageURL} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p className={css.noImage}>No images...</p>}
      {status === 'resolved' && <Button onLoadMore={onLoadMore} />}
      
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          closeImage={closeImage}
          closeOnEscape={closeOnEscape}
        />
      )}
    </div>
  );
};