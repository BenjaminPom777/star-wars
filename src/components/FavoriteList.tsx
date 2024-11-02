// src/components/FavoriteList.tsx
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';
import { Character } from '../types/characterTypes';

interface FavoriteListProps {
    favorites: Character[];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites }) => {
    const [bgColor, setBgColor] = useState<string>('white');

    const changeBackgroundColor = () => {
        const colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow'];
        
        const availableColors = colors.filter(color => color !== bgColor);

        const newColor = availableColors[Math.floor(Math.random() * availableColors.length)];

        setBgColor(newColor);
    };
    return (
        <Box width="48%" bgcolor={bgColor} p={2} borderRadius="8px">
            <Typography variant="h4" gutterBottom>
                Favorites
            </Typography>
            <Button variant="contained" onClick={changeBackgroundColor} style={{ marginBottom: '10px' }}>
                Change Background Color
            </Button>
            <List>
                {favorites.length === 0 ? (
                    <Typography>No favorites yet.</Typography>
                ) : (
                    favorites.map((character) => (
                        <ListItem key={character.url}>
                            <Typography>{character.name}</Typography>
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
};

export default FavoriteList;
