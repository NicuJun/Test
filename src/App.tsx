import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardBody from './components/Card/Card';
import Grid from '@mui/material/Grid';
import { Container, Modal, Box } from '@mui/material';
import Auth from './components/Form/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import initialMovies from '../src/movies.json';

interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  format: string;
  stars: string[];
}

function AppContent() {
  const { openAuth, setOpenAuth, user, logout, addMovie, deleteMovie } = useAuth();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchActor, setSearchActor] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    let parsedMovies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [];

    const moviesToAdd = initialMovies.filter(
      (jsonMovie) => !parsedMovies.some((m) => m.id === jsonMovie.id)
    );
    if (moviesToAdd.length > 0) {
      parsedMovies = [...parsedMovies, ...moviesToAdd];
      localStorage.setItem('movies', JSON.stringify(parsedMovies));
      console.log('Added movies from movies.json to LocalStorage:', moviesToAdd);
    }

    setMovies(parsedMovies);
    console.log('Loaded movies:', parsedMovies);

    if (!storedMovies) {
      console.log('Initialized LocalStorage with:', parsedMovies);
    }
  }, []);


  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    const updatedMovies = addMovie(newMovie);
    setMovies(updatedMovies);
    console.log('Updated movies after adding:', updatedMovies);
  };

  const handleDeleteMovie = (movieId: number) => {
    const updatedMovies = deleteMovie(movieId);
    setMovies(updatedMovies);
    console.log('Updated movies after deleting ID', movieId, ':', updatedMovies);
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredMovies = movies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        (searchActor === '' ||
          movie.stars.some((star) => star.toLowerCase().includes(searchActor.toLowerCase())))
    )
    .sort((a, b) => {
      if (!sortOrder) return 0;
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return sortOrder === 'asc'
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

  return (
    <>
      <Header
        onAccountClick={() => (user ? logout() : setOpenAuth(true))}
        onSearchTitle={setSearchTitle}
        onSearchActor={setSearchActor}
        onSort={handleSort}
        onAddMovie={handleAddMovie}
      />
      <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Auth />
        </Box>
      </Modal>
      <Routes>
        <Route
          path="/"
          element={
            <Container sx={{ marginTop: 4, marginBottom: 4 }}>
              <Grid container spacing={4}>
                {filteredMovies.map((movie) => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <CardBody
                      movieId={movie.id}
                      title={movie.title}
                      format={movie.format}
                      stars={movie.stars}
                      onDelete={handleDeleteMovie}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          }
        />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;