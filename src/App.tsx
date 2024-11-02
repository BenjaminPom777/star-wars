// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import UserList from './components/CharacterList';
import FavoriteList from './components/FavoriteList';
import { Character } from './types/characterTypes';

const App: React.FC = () => {  
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  
  const toggleFavorite = (character: Character) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.url === character.url)) {
      updatedFavorites = favorites.filter((fav) => fav.url !== character.url);
    } else {
      updatedFavorites = [...favorites, character];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <UserList favorites={favorites} toggleFavorite={toggleFavorite} />
      <FavoriteList favorites={favorites} />
    </Box>
  );
};

export default App;
