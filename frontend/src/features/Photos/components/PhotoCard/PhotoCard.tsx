import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../constants';
import { Photo } from '../../../../types';
import React from 'react';

interface Props {
  photo: Photo;
  onDialog: (url: string) => void;
}

const PhotoCard: React.FC<Props> = ({ photo, onDialog }) => {
  const navigate = useNavigate();

  const ImgUrl = photo.image ? `${API_URL}/${photo.image}` : '';

  const onClickNavigate = () => {
    navigate('/photos/' + photo.author._id);
  };

  const handleDialogOpen = () => {
    if (ImgUrl) {
      onDialog(ImgUrl);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3, borderRadius: 2 }}>
      <CardActionArea sx={{ paddingX: 4 }} onClick={handleDialogOpen}>
        {ImgUrl && (
          <CardMedia
            component="img"
            height="250"
            image={ImgUrl}
            alt={photo.title}
            sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {photo.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea onClick={onClickNavigate}>
        <Typography variant="h6" component="div" textAlign="center" sx={{ padding: '8px' }}>
          Created by: {photo.author.displayName}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default PhotoCard;
