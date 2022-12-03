import React from 'react';
import Card from '@mui/material/Card';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  onCloseClick: () => void;
}

export const OfferCard = ({ onCloseClick }: Props) => {
  return (
    <Card
      sx={{
        padding: 3,
        borderRadius: 1,
        flexShrink: 0,
        boxShadow: 'rgb(29 71 123 / 4%) 0px 5px 10px, rgb(29 71 123 / 12%) 0px 1px 5px',
        display: 'flex'
      }}>
      <Box color="#0D76D6" marginRight={1}>
        <MonetizationOnIcon color="inherit" fontSize={'large'} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5
        }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1875rem',
            marginBottom: '-20px'
          }}>
          Make your strongest offer when you buy with Opendoor
        </Typography>
        <a href="https://buy.opendoor.com/offers/win?utm_source=bwod&utm_medium=web&utm_campaign=map&referrer=https%3A%2F%2Fwww.opendoor.com%2Fhomes%2Ftampa%3Fmap%3Dfalse">
          Learn more `{'>'}`
        </a>
      </Box>
      <Box
        sx={{
          marginTop: '7%',
          cursor: 'pointer'
        }}>
        <ClearIcon fontSize={'small'} onClick={onCloseClick} />
      </Box>
    </Card>
  );
};
