import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardBody from './components/Card/Card';
import Grid from '@mui/material/Grid';
import { Container, Modal, Box } from '@mui/material';
import Auth from './components/Form/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import movies from './movies.json';

function AppContent() {
  const { openAuth, setOpenAuth } = useAuth();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchActor, setSearchActor] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

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
      if (!sortOrder) return 0; // No sorting by default
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return sortOrder === 'asc'
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

  return (
    <>
      <Header
        onAccountClick={() => setOpenAuth(true)}
        onSearchTitle={setSearchTitle}
        onSearchActor={setSearchActor}
        onSort={handleSort}
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
            bgcolor: 'transparent',
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