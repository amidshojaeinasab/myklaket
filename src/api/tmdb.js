// src/api/tmdb.js
import axios from 'axios';

const TMDB_BASE = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: TMDB_BASE,
  timeout: 10000,
});

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function searchMovies(query, page = 1) {
  const res = await api.get('/search/movie', {
    params: {
      api_key: apiKey,
      query,
      page,
      include_adult: false,
    }
  });
  return res.data;
}
