
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardBody() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
      // image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Movie:ID
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Movie info
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='error'>
          Видалити
        </Button>

        <Button size="small">Більше інформації</Button>
      </CardActions>
    </Card>
  );
}
