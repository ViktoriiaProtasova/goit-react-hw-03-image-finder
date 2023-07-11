import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  static propTypes = { onSubmit: PropTypes.func.isRequired };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('Oops! Enter a search query.');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div className={css.Searchbar}>
        <form
          onSubmit={this.handleSubmit}
          className={css.SearchForm}
          id="search-form"
        >
          <input
            type="search"
            name="searchQuery"
            autoComplete="off"
            placeholder="Search images..."
            className={css.SearchFormInput}
            onChange={this.handleChange}
            value={searchQuery}
          />
          <button type="submit" className={css.SearchFormButton}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default Searchbar;
