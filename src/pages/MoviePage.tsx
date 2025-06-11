
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

import movies from '../movies.json';

function MoviePage() {
    const { id } = useParams();

    const movieId = parseInt(id || '0', 10);
    const movie = movies.find((m) => m.id === movieId);

    return (
        <>

            <Container sx={{ marginTop: 4, marginBottom: 4 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
                        Back
                    </Link>
                </Box>
                {movie ? (
                    <Box>
                        <Typography variant="h4">{movie.title}</Typography>
                        <Typography variant="subtitle1">Release Year: {movie.releaseYear}</Typography>
                        <Typography variant="subtitle1">Format: {movie.format}</Typography>
                        <Typography variant="subtitle1">Stars: {movie.stars.join(', ')}</Typography>
                    </Box>
                ) : (
                    <Typography variant="h4">Movie not found</Typography>
                )}
            </Container>

        </>
    );
}

export default MoviePage;