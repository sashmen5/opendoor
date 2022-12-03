import * as React from 'react';
import dropLast from 'lodash/fp/dropLast';
import join from 'lodash/fp/join';
import map from 'lodash/fp/map';
import isEmpty from 'lodash/fp/isEmpty';
import size from 'lodash/fp/size';
import flowFp from 'lodash/fp/flow';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Home, Unit } from '../types';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Swiper, useSwiper } from '../../components';

interface Props {
  home: Home;
}

const dropCents = dropLast(3);

export const HomeCard = ({ home }: Props) => {
  const { handleStepChange, activeStep, handleBack, handleNext } = useSwiper();
  const showStepActions = !isEmpty(home.images);

  const computeUnitLabel = (unit: Unit) => {
    return `${unit.bedroom}bd, ${unit.bathroom}bt, ${unit.squareFootage.toLocaleString('en-US')} ft²`;
  };

  const computePrice = (price: number) => {
    return flowFp(
      price =>
        price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        }),
      dropCents,
      join('')
    )(price);
  };

  const disableBack = activeStep === 0;
  const disableNext = activeStep === size(home.images) - 1;

  return (
    <Card
      sx={{
        borderRadius: 4,
        flexShrink: 0,
        boxShadow: 'rgb(29 71 123 / 4%) 0px 5px 10px, rgb(29 71 123 / 12%) 0px 1px 5px'
      }}>
      <Content>
        <MediaContent>
          <Swiper index={activeStep} onChangeIndex={handleStepChange}>
            {map(
              imgSrc => (
                <CardMedia key={imgSrc} component="img" image={imgSrc} alt="" />
              ),
              home.images
            )}
          </Swiper>
          {showStepActions && (
            <>
              <PrevIconWrapper disabled={disableBack} aria-label="prev" size="medium" onClick={handleBack}>
                <ChevronLeftIcon fontSize="inherit" />
              </PrevIconWrapper>
              <NextIconWrapper disabled={disableNext} aria-label="next" size="medium" onClick={handleNext}>
                <ChevronRightIcon fontSize="inherit" />
              </NextIconWrapper>
            </>
          )}
        </MediaContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
            {computePrice(home.purchasePrice)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {computeUnitLabel(home.units[0])}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {home.address.streetNumber}, {home.address.route}, {home.address.locality}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {home.address.state}, {home.address.stateCode}
          </Typography>
        </CardContent>
      </Content>
    </Card>
  );
};

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row'
  }
}));

const MediaContent = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '250px',
  [theme.breakpoints.up('md')]: {
    height: '200px',
    maxWidth: '45%',
    flexBasis: '45%'
  },
  '& img': {
    height: '100%'
  }
}));

const StepIconWrapper = styled(IconButton)<IconButtonProps>(() => ({
  position: 'absolute',
  top: '50%',
  color: 'white',
  transform: 'translate(0, -50%)'
}));

const PrevIconWrapper = styled(StepIconWrapper)<IconButtonProps>(() => ({
  left: 5
}));

const NextIconWrapper = styled(StepIconWrapper)<IconButtonProps>(() => ({
  right: 5
}));
