import axios from 'axios';

const API_KEY = '14714406-4d485148789c4e4629afff759';
axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}&per_page=12&image_type=photo&orientation=horizontal`;

const getData = async (searchQuery, page) => {
  try {
    const { data } = await axios.get(`&q=${searchQuery}&page=${page}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
