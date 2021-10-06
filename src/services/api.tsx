

// https://api.themoviedb.org/3/movie/now_playing?api_key=0390182c50a940bd768a0a83f71c36af&language=en-US&page=1

import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

const API_KEY = '0390182c50a940bd768a0a83f71c36af';

export const nowPlaying = () => {
  return api.get('movie/now_playing', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1
    }
  });
};

export const popular = () => {
  return api.get('movie/popular', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1
    }
  });
};

export const topRated = () => {
  return api.get('movie/top_rated', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1
    }
  });
};