import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import mapImage from './assets/map.png';

import Hidden from '@mui/material/Hidden';
import { styled } from '@mui/material/styles';

import { HeaderContent } from './layout';
import { useHomesManagerStore } from './root-store';
import { HomeManager } from './home-manager';

const App = observer(() => {
  const { load } = useHomesManagerStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Parent>
      <Header>
        <HeaderContent />
      </Header>
      <Hidden smDown>
        <Map>
          <img src={mapImage} alt="" />
        </Map>
      </Hidden>

      <List>
        <HomeManager />
      </List>
    </Parent>
  );
});

export default App;

const Parent = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'auto 1fr',
  height: '100%'
}));

const Header = styled('div')(() => ({
  boxShadow: '0 1px 4px rgb(68 89 109 / 15%)',
  gridArea: '1 / 1 / 2 / 3'
}));

const Map = styled('div')(({ theme }) => ({
  gridArea: '2 / 1 / 3 / 3',
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    gridArea: '2 / 1 / 3 / 2'
  },
  '& > img': {
    width: '100%',
    objectFit: 'cover'
  }
}));

const List = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  gap: 10,
  gridArea: '2 / 1 / 3 / 3',
  [theme.breakpoints.up('sm')]: {
    gridArea: '2 / 2 / 3 / 3'
  }
}));
