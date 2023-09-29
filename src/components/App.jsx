import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImagesApi } from 'api/pixabayApi';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import React from 'react';
import { useState } from 'react';

const App = () => {
  const [serchQuerry, setSerchQuerry] = useState();
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      setShowLoader(true);
      try {
        const data = await getImagesApi(serchQuerry, page);
        if (data.hits.length === 0) {
          return Notify.failure('Find no images');
        }
        setHits(prevState => prevState.concat(data.hits));
        setTotalHits(data.totalHits);
      } catch ({ message }) {
        Notify.failure('Please try again later ', message);
      } finally {
        setShowLoader(false);
      }
    };
    if (serchQuerry) {
      fetchApi();
    }
  }, [serchQuerry, page]);

  const onSubmit = e => {
    e.preventDefault();
    let String = e.target[1].value;
    let pattern = /^[\s]+$/;
    if (!e.target[1].value || pattern.test(String)) {
      return Notify.failure(
        'Please type serching tag or delete spase from begining'
      );
    }
    setSerchQuerry(e.target[1].value);
    setPage(1);
    setHits([]);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const largeImageOpen = largeImageURL => {
    setModalItem(largeImageURL);
    setShowModal(true);
  };

  const closeModal = e => {
    if (e.target.src !== modalItem || e.code === 'Escape') {
      setShowModal(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={hits} onClick={largeImageOpen} />
      {showLoader && <Loader />}
      {!showLoader && hits.length < totalHits && hits.length > 0 && (
        <Button onClick={loadMore} />
      )}
      {showModal && <Modal largeImg={modalItem} closeModal={closeModal} />}
    </>
  );
};

export default App;
