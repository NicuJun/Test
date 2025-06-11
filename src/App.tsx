import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardBody from './components/Card/Card';
import Grid from '@mui/material/Grid';
import { Container, Modal, Box } from '@mui/material';
import Auth from './components/Form/Auth';
import React, { useState } from 'react';

function App() {
  const [openAuth, setOpenAuth] = useState(false);
  const cards = Array.from({ length: 20 });

  return (
    <>
      <Header onAccountClick={() => setOpenAuth(true)} />
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
      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <Grid container spacing={4}>
          {cards.map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CardBody />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default App;