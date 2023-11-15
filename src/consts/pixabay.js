export const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = 'https://pixabay.com/api/';
export const getPixaBayUrl = (searchQuery, page) => {
  return `${baseUrl}?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
};
