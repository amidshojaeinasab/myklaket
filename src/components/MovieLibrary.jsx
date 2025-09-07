import React from 'react';
import { Flex } from 'antd';
import MovieCard from './MovieCard';

const MovieLibrary = ({ movies, onDelete, onRate }) => {
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 8, minHeight: '100%' }}>
      <h2>My Library {movies.length > 0 && `(${movies.length})`}</h2>
      <Flex wrap="wrap" justify="center" gap="large">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onDelete={onDelete} 
              onRate={onRate} 
            />
          ))
        ) : (
          <p>Your library is empty. Search for a movie to get started!</p>
        )}
      </Flex>
    </div>
  );
};

export default MovieLibrary;
