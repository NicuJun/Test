import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardBody from './components/Card/Card';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';


function App() {
  const cards = Array.from({ length: 20 });

  return (
    <>
      <Header />

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
