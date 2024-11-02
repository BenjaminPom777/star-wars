// src/components/CharacterModal.tsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { Character } from '../types/characterTypes';

interface CharacterModalProps {
    open: boolean;
    onClose: () => void;
    character: Character | null;
}

interface Homeworld {
    name: string;
    terrain: string;
    climate: string;
    population: string;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ open, onClose, character }) => {
    const [homeworld, setHomeworld] = useState<Homeworld | null>(null);

    useEffect(() => {
        if (character) {
            // Fetch homeworld details
            fetch(character.homeworld)
                .then((response) => response.json())
                .then((data) => {
                    setHomeworld({
                        name: data.name,
                        terrain: data.terrain,
                        climate: data.climate,
                        population: data.population,
                    });
                })
                .catch(() => {
                    setHomeworld(null);
                });
        }
    }, [character]);

    if (!character) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{character.name}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Height: {character.height} cm</Typography>
                <Typography variant="body1">Mass: {character.mass} kg</Typography>
                <Typography variant="body1">Birth Year: {character.birth_year}</Typography>
                <Typography variant="body1">Number of Films: {character.films.length}</Typography>
                {homeworld ? (
                    <>
                        <Typography variant="body1">Homeworld: {homeworld.name}</Typography>
                        <Typography variant="body1">Terrain: {homeworld.terrain}</Typography>
                        <Typography variant="body1">Climate: {homeworld.climate}</Typography>
                        <Typography variant="body1">Population: {homeworld.population}</Typography>
                    </>
                ) : (
                    <Typography variant="body1">Loading Homeworld Details...</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CharacterModal;
