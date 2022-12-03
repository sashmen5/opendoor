import React, { useEffect, useState } from 'react';
import map from 'lodash/fp/map';
import isEmpty from 'lodash/fp/isEmpty';
import size from 'lodash/fp/size';
import { observer } from 'mobx-react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useHomesManagerStore } from '../root-store';
import { SortArea } from './FilterSortArea.component';
import { HomeCard } from '../home';
import { OfferCard } from '../home/card/OfferCard.component';

export const HomeManager = observer(() => {
  const [offerCardState, setOfferCardState] = useState(true);
  const { load, homes, loading } = useHomesManagerStore();

  useEffect(() => {
    load();
  }, [load]);

  const [first, second, ...tail] = homes;

  const closeOfferCard = () => {
    setOfferCardState(false);
  };

  const showOffer = offerCardState && !isEmpty(homes);

  if (loading) {
    return null;
  }

  return (
    <>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.1875rem',
          marginBottom: '-12px'
        }}>
        Homes for sale
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {size(homes)} listings found
      </Typography>
      <Box display="flex">
        <SortArea />
      </Box>

      {first && <HomeCard home={first} />}
      {second && <HomeCard home={second} />}
      {showOffer && <OfferCard onCloseClick={closeOfferCard} />}
      {map(
        home => (
          <HomeCard key={home._id} home={home} />
        ),
        tail
      )}
    </>
  );
});
