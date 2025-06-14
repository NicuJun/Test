import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    format: string;
    stars: string[];
}

function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const movieId = parseInt(id || '0', 10);
        console.log('Fetching movie with ID:', movieId);
        const movies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');
        const foundMovie = movies.find((m) => m.id === movieId);
        if (foundMovie) {
            setMovie(foundMovie);
            console.log('Found movie:', foundMovie);
        } else {
            console.log('Movie not found for ID:', movieId);
        }
    }, [id]);

    return (
        <Container sx={{ marginTop: 4, marginBottom: 4 }}>
            <Box sx={{ marginBottom: 2 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Назад
                </Link>
            </Box>
            {movie ? (
                <Box>
                    <Typography variant="h4">{movie.title}</Typography>
                    <Typography variant="subtitle1">Рік випуску: {movie.releaseYear}</Typography>
                    <Typography variant="subtitle1">Формат: {movie.format}</Typography>
                    <Typography variant="subtitle1">Актори: {movie.stars.join(', ')}</Typography>
                </Box>
            ) : (
                <Typography variant="h4">Фільм не знайдено</Typography>
            )}
        </Container>
    );
}

export default MoviePage;