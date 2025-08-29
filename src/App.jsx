// src/App.jsx

import { useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import { Button, Flex, Input, Spin, message, Modal, List } from 'antd'; // 1. وارد کردن Modal و List
import './App.css';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]); // کتابخانه ما با یک لیست خالی شروع می‌شود
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // 2. State برای نتایج جستجو
  const [isModalOpen, setIsModalOpen] = useState(false); // 3. State برای نمایش مودال

  // تابع جستجوی فیلم (کمی تغییر کرده)
  const handleSearch = async (value) => {
    if (!value) return;
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`;
      const response = await axios.get(url);
      setSearchResults(response.data.results); // 4. ذخیره نتایج در State
      setIsModalOpen(true); // 5. نمایش مودال نتایج
    } catch (error) {
      console.error("Error fetching data: ", error);
      message.error("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 6. تابع برای اضافه کردن فیلم از نتایج جستجو به کتابخانه
  const handleAddMovie = (movieToAdd) => {
    // چک می‌کنیم فیلم قبلا اضافه نشده باشد
    if (movies.some(movie => movie.id === movieToAdd.id)) {
      message.warning('This movie is already in your library!');
      return;
    }

    // ساخت یک آبجکت فیلم با ساختار دلخواه خودمان
    const newMovie = {
      id: movieToAdd.id,
      title: movieToAdd.title,
      year: movieToAdd.release_date.substring(0, 4),
      posterUrl: `https://image.tmdb.org/t/p/w500${movieToAdd.poster_path}`,
      rating: movieToAdd.vote_average.toFixed(1)
    };

    setMovies([...movies, newMovie]);
    message.success(`${newMovie.title} added to your library!`);
    setIsModalOpen(false); // بستن مودال بعد از اضافه کردن
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
          style={{ maxWidth: 500, margin: '24px 0' }}
        />
        
        <hr style={{width: '80%', margin: '20px 0'}} />
        <h2>My Library {movies.length > 0 && `(${movies.length})`}</h2>
        
        <Flex wrap="wrap" justify="center" gap="large">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>Your library is empty. Search for a movie to get started!</p>
          )}
        </Flex>

        {/* 7. مودال نمایش نتایج جستجو */}
        <Modal 
          title="Search Results" 
          open={isModalOpen} 
          onCancel={() => setIsModalOpen(false)}
          footer={null} // ما دکمه‌های پایینی را نمی‌خواهیم
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
                  avatar={<img width={48} src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} />}
                  title={item.title}
                  description={`Release Date: ${item.release_date}`}
                />
              </List.Item>
            )}
          />
        </Modal>

      </header>
    </div>
  );
}

export default App;