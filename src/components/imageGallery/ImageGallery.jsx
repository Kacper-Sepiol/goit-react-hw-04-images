import React from 'react';
import '../styles/styles.css';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const ImageGallery = ({ images, openModal }) => {
  let i = 1;
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={(i = i + 1)}
          image={image}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
