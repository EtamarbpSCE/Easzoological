import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AnimalInfoCard({cardInfo}) {
  return (
    <Card sx={{ width: '80vw' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cardInfo.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {cardInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {cardInfo.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}