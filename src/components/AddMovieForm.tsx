import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Alert } from '@mui/material';

interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    format: string;
    stars: string[];
}

interface AddMovieFormProps {
    open: boolean;
    onClose: () => void;
    onAddMovie?: (movie: Omit<Movie, 'id'>) => void;
}

function AddMovieForm({ open, onClose, onAddMovie }: AddMovieFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        releaseYear: '',
        format: '',
        stars: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { title, releaseYear, format, stars } = formData;
        if (!title.trim() || !releaseYear.trim() || !format.trim() || !stars.trim()) {
            setError('Усі поля є обов’язковими');
            console.log('Form validation failed: Empty fields');
            return;
        }

        const releaseYearNum = parseInt(releaseYear, 10);
        if (isNaN(releaseYearNum) || releaseYearNum < 1888 || releaseYearNum > new Date().getFullYear()) {
            setError('Некоректний рік випуску');
            console.log('Form validation failed: Invalid release year');
            return;
        }

        const starsArray = stars.split(',').map((star) => star.trim()).filter((star) => star);
        if (starsArray.length === 0) {
            setError('Потрібен хоча б один актор');
            console.log('Form validation failed: No valid stars');
            return;
        }

        const newMovie = {
            title: title.trim(),
            releaseYear: releaseYearNum,
            format: format.trim(),
            stars: starsArray,
        };
        console.log('Adding movie:', newMovie);
        onAddMovie?.(newMovie);

        setFormData({ title: '', releaseYear: '', format: '', stars: '' });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Додати новий фільм
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Назва"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        label="Рік випуску"
                        name="releaseYear"
                        value={formData.releaseYear}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        required
                        type="number"
                        inputProps={{ min: 1888, max: new Date().getFullYear() }}
                    />
                    <TextField
                        label="Формат"
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        label="Актори (через кому)"
                        name="stars"
                        value={formData.stars}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        required
                        helperText="Введіть акторів через кому, наприклад, Актор А, Актор Б"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Додати фільм
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddMovieForm;