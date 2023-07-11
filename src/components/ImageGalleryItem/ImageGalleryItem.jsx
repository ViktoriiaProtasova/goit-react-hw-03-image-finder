import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li onClick={() => onClick(image)} className={css.GalleryLink}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        loading="lazy"
        className={css.ImageGalleryPhoto}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
