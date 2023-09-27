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
  const [SerchQuerry, setSerchQuerry] = useState();
  const [Page, setPage] = useState(1);
  const [Hits, setHits] = useState([]);
  const [TotalHits, setTotalHits] = useState(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const [ModalItem, setModalItem] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      setShowLoader(true);
      try {
        const data = await getImagesApi(SerchQuerry, Page);
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
    if (SerchQuerry) {
      fetchApi();
    }
  }, [SerchQuerry, Page]);

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
    setPage(Page + 1);
  };

  const largeImageOpen = largeImageURL => {
    setModalItem(largeImageURL);
    setShowModal(true);
  };

  const closeModal = e => {
    if (e.target.src !== ModalItem || e.code === 'Escape') {
      setShowModal(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={Hits} onClick={largeImageOpen} />
      {ShowLoader && <Loader />}
      {!ShowLoader && Hits.length < TotalHits && <Button onClick={loadMore} />}
      {ShowModal && <Modal largeImg={ModalItem} closeModal={closeModal} />}
    </>
  );
};

export default App;
