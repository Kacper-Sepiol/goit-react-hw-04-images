import React from 'react';
import './styles/styles.css';
import Searchbar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './button/Button';
import Modal from './modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [maxImages, setMaxImages] = useState(0);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);

    fetchImages();
  };

  const fetchImages = () => {
    const apiKey = '38274981-bf681d1339bb2c6c927a948b3';
    const url = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setPage(prevPage => prevPage.page + 1);
        setMaxImages(data.total);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openModal = image => {
    setShowModal(true);
    setModalImage(image.largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div className="App">
      <header className="Searchbar">
        <Searchbar onSubmit={handleSearchSubmit} />
      </header>
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button
          onClick={fetchImages}
          loading={isLoading}
          image={images}
          mImages={maxImages}
        />
      )}
      {showModal && <Modal image={modalImage} closeModal={closeModal} />}
    </div>
  );
};
