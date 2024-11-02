// src/components/CharacterList.tsx
import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, ListItemButton, Typography, Checkbox } from '@mui/material';
import CharacterModal from './CharacterModal';
import SearchBar from './SearchBar';
import { Character } from '../types/characterTypes';

interface CharacterListProps {
    favorites: Character[];
    toggleFavorite: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ favorites, toggleFavorite }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchCharacters = async (page: number, query: string = '') => {
        try {
            setLoading(true);
            setError(null);
            const url = query
                ? `https://swapi.dev/api/people/?search=${query}`
                : `https://swapi.dev/api/people/?page=${page}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch characters. Please try again later.');
            }
            const data = await response.json();
            setCharacters(data.results);
            setNextPage(data.next);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (searchQuery) {
            fetchCharacters(1, searchQuery); // Always search from page 1
        } else {
            fetchCharacters(currentPage); // Re-fetch without query when search is cleared
        }
    }, [searchQuery]);

    const handleNextPage = () => {
        if (nextPage) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const openModal = (character: Character) => {
        setSelectedCharacter(character);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCharacter(null);
    };

    return (
        <Box width="48%">
            <Typography variant="h4" gutterBottom>
                Star Wars Characters
            </Typography>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Box
                minHeight={'700px'}
                
            >
                {error && <Typography color="error">{error}</Typography>}
                {loading ? (
                    <Typography align="center">Loading...</Typography>
                ) : (
                    <List>
                        {characters.map((character, index) => (
                            <ListItem key={character.url} disablePadding>
                                <ListItemButton onClick={() => openModal(character)}>
                                    <Box display="flex" alignItems="center">
                                        <img
                                            src={`https://picsum.photos/seed/${index}/50/50`}
                                            alt={character.name}
                                            style={{ marginRight: '10px', borderRadius: '50%' }}
                                        />
                                        <Typography>{character.name}</Typography>
                                    </Box>
                                </ListItemButton>
                                <Checkbox
                                    checked={favorites.some((fav) => fav.url === character.url)}
                                    onChange={() => toggleFavorite(character)}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>            
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <Button variant="contained" onClick={handleNextPage} disabled={!nextPage || !!searchQuery}>
                    Next
                </Button>
            </Box>

            <CharacterModal open={isModalOpen} onClose={closeModal} character={selectedCharacter} />
        </Box>
    );
};

export default CharacterList;
