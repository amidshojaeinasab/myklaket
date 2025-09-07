// src/App.jsx

import { useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import { Button, Flex, Input, Spin, Modal, List, App as AntApp } from 'antd';
import './App.css';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const { message } = AntApp.useApp();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... handleSearch (بدون تغییر) ...
  const handleSearch = async (value) => {
    if (!value) return;
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`;
      const response = await axios.get(url);
      setSearchResults(response.data.results);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
      message.error("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = (movieToAdd) => {
    if (movies.some(movie => movie.id === movieToAdd.id)) {
      message.warning('This movie is already in your library!');
      return;
    }

    const newMovie = {
      id: movieToAdd.id,
      title: movieToAdd.title,
      year: movieToAdd.release_date.substring(0, 4),
      posterUrl: `https://image.tmdb.org/t/p/w500${movieToAdd.poster_path}`,
      rating: movieToAdd.vote_average.toFixed(1),
      // ۱. افزودن فیلدهای جدید با مقادیر پیش‌فرض
      userRating: 0,
      userReview: '',
    };

    setMovies([...movies, newMovie]);
    message.success(`${newMovie.title} added to your library!`);
    setIsModalOpen(false);
  };

  const handleDeleteMovie = (movieId, movieTitle) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
    message.info(`${movieTitle} was removed from your library.`);
  };

  // ۲. تابع جدید برای به‌روزرسانی فیلم
  const handleUpdateMovie = (movieId, updates) => {
    setMovies(movies.map(movie => 
      movie.id === movieId ? { ...movie, ...updates } : movie
    ));
    message.success('Your review was updated successfully!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MyKlaket</h1>
        <Input.Search
          placeholder="Search for a movie to add..."
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          loading={loading}
          style={{ maxWidth: 500, width: '100%', margin: '24px 0' }}
        />
      </header>
      <main className="movie-library">
        <h2 className="library-title">My Library {movies.length > 0 && `(${movies.length})`}</h2>
        <Flex wrap="wrap" justify="center" gap="middle">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onDelete={handleDeleteMovie}
                onUpdate={handleUpdateMovie} // ۳. ارسال تابع به‌روزرسانی به عنوان prop
              />
            ))
          ) : (
            <p className="empty-library-message">Your library is empty. Search for a movie to get started!</p>
          )}
        </Flex>
      </main>
      
      {/* ... (بخش Modal جستجو بدون تغییر) ... */}
      <Modal 
        title="Search Results" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <List
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(item) => (
            <List.Item
              actions={[<Button onClick={() => handleAddMovie(item)}>Add to Library</Button>]}
            >
              <List.Item.Meta
                avatar={item.poster_path ? <img width={48} src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title}/> : <div style={{width: 48, height: 72, backgroundColor: '#333'}}></div>}
                title={item.title}
                description={`Release Date: ${item.release_date}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}

export default App;