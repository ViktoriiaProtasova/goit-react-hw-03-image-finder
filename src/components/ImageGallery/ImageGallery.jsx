import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import getData from 'components/getData';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    totalHits: null,
    loading: false,
    loader: false,
    showModal: false,
    selectedImage: null,
  };

  static propTypes = { searchQuery: PropTypes.string.isRequired };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      await this.loadImages(nextSearchQuery, 1);
    }
  }

  loadMoreImages = async () => {
    const { searchQuery } = this.props;
    const { page, totalHits, data } = this.state;

    if (data.length >= totalHits) {
      toast.info("We're sorry, but you've reached the end of search results.");
      return;
    }

    await this.loadImages(searchQuery, page + 1);
  };

  loadImages = async (searchQuery, page) => {
    try {
      this.setState({ loading: true, loader: true });

      const data = await getData(searchQuery, page);
      const { hits, totalHits } = data;

      if (totalHits === 0) {
        toast.error('Oops! Enter a valid search query.');
        return;
      }

      if (page === 1) {
        this.setState({ data: hits, totalHits });
      } else {
        this.setState(prevState => ({
          data: [...prevState.data, ...hits],
        }));
      }

      this.setState({ page });
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something went wrong. Try again later.');
    } finally {
      this.setState({ loading: false, loader: false });
    }
  };

  toggleModal = image => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: image,
    }));
  };

  render() {
    const { data, loading, loader, showModal, selectedImage } = this.state;

    return (
      <>
        <div className={css.loaderWrapper}>
          {loader && (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          )}
        </div>
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
        {!loading && data.length > 0 && (
          <Button onClick={this.loadMoreImages} />
        )}
      </>
    );
  }
}

export default ImageGallery;
