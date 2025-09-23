import React, { createContext, useState, useEffect } from 'react';

export const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('myLibrary');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('myLibrary', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie) => {
    if (!movies.find(m => m.id === movie.id)) {
      setMovies([...movies, { ...movie, rating: 0, note: '' }]);
    }
  };

  const removeMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id));
  };

  const updateMovie = (id, newData) => {
    setMovies(movies.map(m => m.id === id ? { ...m, ...newData } : m));
  };

  return (
    <LibraryContext.Provider value={{ movies, addMovie, removeMovie, updateMovie }}>
      {children}
    </LibraryContext.Provider>
  );
}
