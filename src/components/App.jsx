import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import getData from 'components/getData';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './ImageGallery/ImageGallery.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    data: [],
    page: 1,
    totalHits: null,
    loading: false,
    loader: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      await this.loadImages(nextSearchQuery, 1);
    }
  }

  loadMoreImages = async () => {
    const { searchQuery, page, totalHits, data } = this.state;

    if (data.length >= totalHits) {
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

  render() {
    const { data, loader, loading, totalHits } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
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
        <ImageGallery data={data} />
        {!loading && data.length > 0 && data.length < totalHits && (
          <Button onClick={this.loadMoreImages} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  }
}

export default App;
