import * as React from 'react';
import { observer } from 'mobx-react';

import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';

import { SortBy } from './types';

import { useHomesManagerStore } from '../root-store';

const labels: Record<SortBy, string> = {
  active: 'Active',
  sold: 'Sold',
  newest: 'Newest',
  older: 'Older'
};

const resolveLabel = (type: SortBy) => {
  return labels[type];
};

export const SortArea = observer(() => {
  const { order, setOrder } = useHomesManagerStore();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const selectionHandlerCreator = (type: SortBy) => (event: Event | React.SyntheticEvent) => {
    setOrder(type);
    handleClose(event);
  };

  const isSelected = (type: SortBy) => order === type;

  return (
    <>
      <Selection ref={anchorRef} onClick={handleToggle}>
        {resolveLabel(order)}
        {!open && <KeyboardArrowDownIcon />}
        {open && <KeyboardArrowUpIcon />}
      </Selection>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              marginTop: 8,
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}>
            <BorderWrapper>
              <ClickAwayListener onClickAway={handleClose}>
                <List dense>
                  <ListItemButton onClick={selectionHandlerCreator('newest')} selected={isSelected('newest')}>
                    <ListItemText primary={resolveLabel('newest')} />
                  </ListItemButton>

                  <ListItemButton onClick={selectionHandlerCreator('older')} selected={isSelected('older')}>
                    <ListItemText primary={resolveLabel('older')} />
                  </ListItemButton>

                  <ListItemButton onClick={selectionHandlerCreator('active')} selected={isSelected('active')}>
                    <ListItemText primary={resolveLabel('active')} />
                  </ListItemButton>

                  <ListItemButton onClick={selectionHandlerCreator('sold')} selected={isSelected('sold')}>
                    <ListItemText primary={resolveLabel('sold')} />
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </BorderWrapper>
          </Grow>
        )}
      </Popper>
    </>
  );
});

const BorderWrapper = styled('div')(({ theme }) => ({
  border: '2px solid #222',
  color: '#222',
  borderRadius: theme.spacing(1),
  background: 'white'
}));

const Selection = styled(BorderWrapper)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(0.5, 1),
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer'
}));
