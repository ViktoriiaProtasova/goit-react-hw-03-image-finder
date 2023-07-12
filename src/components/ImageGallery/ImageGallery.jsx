import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    showModal: false,
    selectedImage: null,
  };

  static propTypes = { data: PropTypes.array.isRequired };

  toggleModal = image => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: image,
    }));
  };

  render() {
    const { showModal, selectedImage } = this.state;
    const { data } = this.props;

    return (
      <>
        {showModal && (
          <Modal onClick={this.toggleModal}>
            {selectedImage && (
              <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
            )}
          </Modal>
        )}
        <ul className={css.ImageGallery}>
          {data.map(image => (
            <ImageGalleryItem
              onClick={this.toggleModal}
              key={image.id}
              image={image}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
