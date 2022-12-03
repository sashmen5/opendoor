import React from 'react';
import { observer } from 'mobx-react';

import Hidden from '@mui/material/Hidden';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import { OpendoorIcon, OpendoorSmallIcon } from '../assets';
import { useHomesManagerStore } from '../root-store';

export const HeaderContent = observer(() => {
  const { filter, setFilter, loading } = useHomesManagerStore();
  console.log({ loading });

  return (
    <Wrapper>
      <Hidden mdDown>
        <OpendoorIcon />
      </Hidden>

      <Hidden mdUp>
        <OpendoorSmallIcon />
      </Hidden>
      <TextField
        variant="standard"
        placeholder="Search"
        InputProps={{ startAdornment: <SearchIcon /> }}
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <div />
      {loading && (
        <LoaderWrapper>
          <LinearProgress />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
});

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 2),
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  position: 'relative'
}));

const LoaderWrapper = styled('div')(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
}));
