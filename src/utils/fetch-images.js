import axios from "axios";



export const fetchImages = async (query, page) => {
    axios.defaults.baseURL = 'https://pixabay.com/api';
    const API_KEY = '30786183-1701cbc3e014bdedf8e1f6ac3';
    const params = 'image_type=photo&orientation=horizontal&per_page=12';

    return await axios.get(`/?q=${query}&page=${page}&key=${API_KEY}&${params}`);
}