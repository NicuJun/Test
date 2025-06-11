import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface CardBodyProps {
  movieId: number;
  title: string;
  format: string;
  stars: string[];
}

export default function CardBody({ movieId, title, format, stars }: CardBodyProps) {
  const navigate = useNavigate();

  const handleMoreInfo = () => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Card
      sx={{
        width: 345,
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        alt={`${title} poster`}
        height="200"
        // image={`/path/to/${title.replace(/\s+/g, '-').toLowerCase()}.jpg`} // Uncomment and update with actual image path
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Format: {format}
          <br />
          Stars: {stars.join(', ')}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
        <Button size="small" color="error">
          Видалити
        </Button>
        <Button size="small" onClick={handleMoreInfo}>
          Більше інформації
        </Button>
      </CardActions>
    </Card>
  );
}